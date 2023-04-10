import SelectedProductModel from "@/api/db/models/SeletedProductModel"
import mw from "@/api/mw"
import ProductModel from "@/api/db/models/ProductModel"
import validate from "@/api/middlewares/validate"
import { numberValidator } from "@/components/validation/validation"
import parseSession from "@/web/parseSession"
import UserModel from "@/api/db/models/UserModel"

const handler = mw({
  GET: [
    async ({ res }) => {
      const products = await SelectedProductModel.query().withGraphFetched(
        "user"
      )

      res.send({ result: products })
    },
  ],
  POST: [
    validate({
      productId: numberValidator.required(),
    }),
    async ({
      locals: {
        body: { productId, jwt },
      },
      res,
    }) => {
      const session = parseSession(jwt.jwt)
      const id = session.user.id
      const user = await UserModel.query().findOne({ id })

      if (user.roleid !== 1) {
        res.status(403).send({ error: "You are not admin" })

        return
      }

      const product = await ProductModel.query().findById(productId)

      if (!product) {
        return res.status(400).send({ error: "CarrouselProducts not found" })
      }

      const existingSelectedProduct = await SelectedProductModel.query()
        .where("product_id", productId)
        .first()

      if (existingSelectedProduct) {
        return res.status(400).send({
          error: "CarrouselProducts already add",
        })
      }

      const maxOrder = await SelectedProductModel.query().max(
        "order as maxOrder"
      )

      const newOrder = (maxOrder[0].maxOrder || 0) + 1

      const newSelectedProduct = await SelectedProductModel.query().insert({
        order: newOrder,
        product_id: productId,
      })

      res.status(201).send({ result: newSelectedProduct })
    },
  ],
})

export default handler
