import mw from "@/api/mw"
import validate from "@/api/middlewares/validate"
import {boolValidator, numberValidator} from "@/components/validation/validation"
import {NotFoundError} from "@/api/errors"
import ProductModel from "@/api/db/models/ProductModel"

const handler = mw({
  GET: [
    validate({
      query: {
        productId: numberValidator.required(),
        withSimilarProducts: boolValidator.optional()
      }
    }),
    async ({
             locals: {
               query: { productId, withSimilarProducts }
             },
             res
           }) => {
      const id = productId

      const product = await ProductModel.query().findOne({ id })

      if (!product || product.categoryId === 0) {
        res.send({ result: null })

        throw new NotFoundError()
      }

      const similarProducts = withSimilarProducts ? await ProductModel.query()
        .where("id", "!=", product.id)
        .where("categoryId", "=", product.categoryId)
        .where("quantity", ">", 0)
        .limit(10) : null

      res.send({
        product,
        similarProducts
      })
    }
  ]
})

export default handler
