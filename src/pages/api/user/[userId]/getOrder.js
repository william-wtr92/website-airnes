import OrderModel from "@/api/db/models/OrderModel"
import auth from "@/api/middlewares/auth"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { numberValidator } from "@/components/validation/validation"

const handler = mw({
  GET: [
    auth("user"),
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
      const query = await OrderModel.query().where({ user_id: userId }).orderBy("created_at", "desc")

      if (!query) {
        res.send({ result: null })
      }

      res.send({
        result: query,
      })
    },
  ],
})

export default handler
