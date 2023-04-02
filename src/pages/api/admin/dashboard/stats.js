import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import UserModel from "@/api/db/models/UserModel"
import ProductModel from "@/api/db/models/ProductModel"

const handler = mw({
  GET: [
    validate({
      query: {},
    }),
    async ({ res }) => {
      const userCount = await UserModel.query().count().first()
      const productCount = await ProductModel.query().count().first()

      res.send({
        user: userCount.count,
        product: productCount.count,
      })
    },
  ],
})

export default handler
