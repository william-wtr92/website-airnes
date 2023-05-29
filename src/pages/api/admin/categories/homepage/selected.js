import SelectedCategoryModel from "@/api/db/models/SelectedCategoryModel"
import mw from "@/api/mw"
import CategoryModel from "@/api/db/models/CategoryModel"
import validate from "@/api/middlewares/validate"
import { numberValidator } from "@/components/validation/validation"
import auth from "@/api/middlewares/auth"
import { NotFoundError } from "@/api/errors"

const handler = mw({
  GET: [
    async ({ res }) => {
      const categories = await SelectedCategoryModel.query()
        .withGraphJoined("category")
        .orderBy("order")

      if (!categories) {
        throw new NotFoundError()
      }

      res.send({ result: categories })
    },
  ],
  POST: [
    auth("admin"),
    validate({
      categoryId: numberValidator.required(),
    }),
    async ({
      locals: {
        body: { categoryId },
      },
      res,
    }) => {
      const category = await CategoryModel.query().findById(categoryId)

      if (!category) {
        return res.status(400).send({ error: "Category not found" })
      }

      const existingSelectedCategory = await SelectedCategoryModel.query()
        .where("category_id", categoryId)
        .first()

      if (existingSelectedCategory) {
        return res.status(400).send({
          error: "Category already add",
        })
      }

      const maxOrder = await SelectedCategoryModel.query().max(
        "order as maxOrder"
      )

      const newOrder = (maxOrder[0].maxOrder || 0) + 1

      const newSelectedCategory = await SelectedCategoryModel.query().insert({
        order: newOrder,
        category_id: categoryId,
      })

      res.status(201).send({ result: newSelectedCategory })
    },
  ],
})

export default handler
