import mw from "@/api/mw"
import {NotFoundError} from "@/api/errors"
import MaterialModel from "@/api/db/models/MaterialModel"
import CategoryModel from "@/api/db/models/CategoryModel"

const handler = mw({
  GET: [
    async ({
             res
           }) => {
      const [categories, materials] = await Promise.all([
        CategoryModel.query().orderBy("id"),
        MaterialModel.query().orderBy("id")
      ])

      if (categories && materials) {
        res.send({
          categories,
          materials
        })
      } else {
        res.send({ result: "" })

        throw new NotFoundError()
      }
    }
  ]
})

export default handler
