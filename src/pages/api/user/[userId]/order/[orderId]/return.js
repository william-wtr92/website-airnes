import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { numberValidator, stringValidator } from "@/components/validation/validation"
import auth from "@/api/middlewares/auth"
import OrderProductModel from "@/api/db/models/OrderProductModel"

const handler = mw({
  PATCH: [
    auth("user"),
    validate({
      body: {
        orderId: numberValidator.required(),
        productId: numberValidator.required(),
        reason: stringValidator.required()
      }
    }),
    async ({
             locals: {
               body: { orderId, productId, reason }
             },
             res
           }) => {
      const product = await OrderProductModel.query()
        .where({ order_id: orderId })
        .where({ product_id: productId })
        .first()

      if (!product) {
        res.send({ result: null })
      }

      const { id } = product

      await OrderProductModel.query().patchAndFetchById(id, {
        ...(product.return !== reason ? { return: reason } : {})
      })

      res.send({ result: true })
    }
  ]
})

export default handler
