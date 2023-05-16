import SelectedProductModel from "@/api/db/models/SeletedProductModel"
import mw from "@/api/mw"
import ProductModel from "@/api/db/models/ProductModel"
import validate from "@/api/middlewares/validate"
import {numberValidator} from "@/components/validation/validation"
import auth from "@/api/middlewares/auth"

const handler = mw({
  GET: [
    async ({ res }) => {
      const products = await SelectedProductModel.query().withGraphFetched("product")

      res.send({ result: products })
    }
  ],
  POST: [
    validate({
      productId: numberValidator.required()
    }),
    auth("admin"),
    async ({
             locals: {
               body: { productId }
             },
             res
           }) => {
      const product = await ProductModel.query().findById(productId)

      if (!product) {
        return res.status(400).send({ error: "HomepageProducts not found" })
      }

      const existingSelectedProduct = await SelectedProductModel.query()
        .where("product_id", productId)
        .first()

      if (existingSelectedProduct) {
        return res.status(400).send({
          error: "HomepageProducts already add"
        })
      }

      const maxOrder = await SelectedProductModel.query().max(
        "order as maxOrder"
      )

      const newOrder = (maxOrder[0].maxOrder || 0) + 1

      const newSelectedProduct = await SelectedProductModel.query().insert({
        order: newOrder,
        product_id: productId
      })

      res.status(201).send({ result: newSelectedProduct })
    }
  ]
})

export default handler
