import AddressModel from "@/api/db/models/AddressModel"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { numberValidator } from "@/components/validation/validation"

const handler = mw({
  GET: [
    validate({
      query: {
        userId: numberValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { userId },
      },
      res,
    }) => {
      const address = await AddressModel.query().where("userid", userId)

      res.send({
        data: address,
      })
    },
  ],
})

export default handler
