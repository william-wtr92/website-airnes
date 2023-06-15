import OrderModel from "@/api/db/models/OrderModel"
import OrderProductModel from "@/api/db/models/OrderProductModel"
import auth from "@/api/middlewares/auth"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { numberValidator } from "@/components/validation/validation"
import ProductModel from "@/api/db/models/ProductModel"

const handler = mw({
  GET: [
    auth("user"),
    validate({
      query: {
        userId: numberValidator.required(),
        orderId: numberValidator.required()
      }
    }),
    async ({
             locals: {
               query: { userId, orderId }
             },
             res
           }) => {
      const orderQuery = await OrderModel.query()
        .where({ user_id: userId })
        .where({ id: orderId })
        .withGraphFetched("addressData")

      if (!orderQuery) {
        res.send({ result: null })
      }

      const product = await OrderProductModel.query()
        .where({ order_id: orderId })
        .withGraphFetched("productData")

      if (!product) {
        res.send({ result: orderQuery })
      }

      res.send({
        result: orderQuery,
        product
      })
    }
  ],
  PATCH: [
    auth("user"),
    validate({
      query: {
        orderId: numberValidator.required()
      }
    }),
    async ({
             locals: {
               query: { orderId }
             }
           },
           res) => {
      const id = orderId

      const order = await OrderModel.query()
        .where({ id })
        .where({ status: "pending" })
        .withGraphFetched("products")

      if (!order) {
        res.send({ result: null })
      }

      const [{ products }] = order

      products.map(async (product) => {
        const currentProduct = await ProductModel.query().where({ id: product.product_id }).first()
        const quantity = currentProduct.quantity + product.product_quantity

        await ProductModel.query().updateAndFetchById(product.product_id, { quantity })
      })

      await OrderModel.query().updateAndFetchById(id, {
        status: "canceled"
      })

      res.send({ result: true })
    }
  ]
})

export default handler
