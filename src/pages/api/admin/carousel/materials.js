import { NotFoundError } from "@/api/errors"
import auth from "@/api/middlewares/auth"
import mw from "@/api/mw"
import MaterialModel from "@/api/db/models/MaterialModel"

const handler = mw({
  GET: [
    auth("admin"),
    async ({ res }) => {
      const product = await MaterialModel.query().modify("sanitize")

      if (!product) {
        throw new NotFoundError()
      }

      res.send({ result: product })
    },
  ],
})

export default handler
