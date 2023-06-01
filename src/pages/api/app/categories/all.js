import CategoryModel from "@/api/db/models/CategoryModel"
import mw from "@/api/mw"

const handler = mw({
  GET: [
    async ({
             res
           }) => {
      const categories = await CategoryModel.query().where("id", "!=", 0).orderBy("name", "asc")

      res.send({
        data: categories,
      })
    }
  ]
})

export default handler
