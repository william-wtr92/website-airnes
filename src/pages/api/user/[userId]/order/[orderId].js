import OrderModel from "@/api/db/models/OrderModel"
import OrderProductModel from "@/api/db/models/OrderProductModel"
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
        orderId: numberValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { userId, orderId },
      },
      res,
    }) => {
      const orderQuery = await OrderModel.query()
        .where({ user_id: userId })
        .where({ id: orderId })
        .withGraphFetched("addressData")

      if (!orderQuery) {
        res.send({ result: null })
      }

      const productQuery = await OrderProductModel.query()
        .where({ order_id: orderId })
        .withGraphFetched("productData")

      if (!productQuery) {
        res.send({ result: orderQuery })
      }

      res.send({
        result: orderQuery,
        product: productQuery,
      })
    },
  ],
})

export default handler
