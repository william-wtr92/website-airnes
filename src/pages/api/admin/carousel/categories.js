import CategoryModel from "@/api/db/models/CategoryModel"
import { NotFoundError } from "@/api/errors"
import auth from "@/api/middlewares/auth"
import mw from "@/api/mw"

const handler = mw({
  GET: [
    auth("admin"),
    async ({ res }) => {
      const product = await CategoryModel.query().modify("sanitize")

      if (!product) {
        throw new NotFoundError()
      }

      res.send({ result: product })
    },
  ],
})

export default handler
