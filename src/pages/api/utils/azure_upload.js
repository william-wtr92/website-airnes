import { uploadFile } from "./azure_utils"
import AzureModel from "@/api/db/models/AzureModel"
import { fileNameValidator } from "@/components/validation/admin/azure"
import { InvalidUploadError } from "@/api/errors"
import { IncomingForm } from "formidable"
import nextConnect from "next-connect"
import mw from "@/api/mw"

const handler = nextConnect()

handler.use(
  mw({
    POST: [
      async (req, res) => {
        const form = new IncomingForm()

        form.parse(req, async (err, fields, files) => {
          if (err) {
            throw new InvalidUploadError()
          }

          const file = files.file
          const filename = fields.filename

          if (!fileNameValidator.test(filename)) {
            res.status(422).send({ error: "Invalid filename" })

            return
          }

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
        })
      },
    ],
  })
)

export default handler
