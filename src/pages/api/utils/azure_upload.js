import { uploadFile } from "./azure_utils"
import AzureModel from "@/api/db/models/AzureModel"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { fileNameValidator } from "@/components/validation/contact"
import { InvalidUploadError } from "@/api/errors"

const handler = mw({
  POST: [
    validate({
      body: {
        filename: fileNameValidator.required(),
      },
    }),
    async ({
      locals: {
        body: { filename, file },
      },
      res,
    }) => {
      try {
        const url = await uploadFile(file)

        await AzureModel.query().insert({
          filename,
          url,
        })
      } catch (err) {
        throw new InvalidUploadError()
      }

      res.send({ result: true })
    },
  ],
})

export default handler
