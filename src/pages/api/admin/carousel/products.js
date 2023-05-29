import ProductModel from "@/api/db/models/ProductModel"
import { NotFoundError } from "@/api/errors"
import mw from "@/api/mw"

const handler = mw({
  GET: [
    async ({ res }) => {
      const product = await ProductModel.query().modify("sanitize")

      if (!product) {
        throw new NotFoundError()
      }

      res.send({ result: product })
    },
  ],
})

export default handler
