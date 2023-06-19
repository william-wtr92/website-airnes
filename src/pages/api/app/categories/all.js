import CategoryModel from "@/api/db/models/CategoryModel"
import mw from "@/api/mw"

const handler = mw({
  GET: [
    async ({
             res
           }) => {
      const categories = await CategoryModel.query().where("name", "!=", "No category").orderBy("name", "asc")

      res.send({
        data: categories,
      })
    }
  ]
})

export default handler
