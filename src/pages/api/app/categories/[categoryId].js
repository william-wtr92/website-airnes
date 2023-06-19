import mw from "@/api/mw"
import validate from "@/api/middlewares/validate"
import { categoryValidator } from "@/components/validation/validation"
import CategoryModel from "@/api/db/models/CategoryModel"
import { NotFoundError } from "@/api/errors"
import { boolean } from "yup"

const handler = mw({
  GET: [
    validate({
      query: {
        categoryId: categoryValidator.required(),
        showProducts: boolean(),
      },
    }),
    async ({
      locals: {
        query: { categoryId },
      },
      res,
    }) => {
      const category = await CategoryModel.query()
        .where("name", "!=", "No category")
        .findOne({ id: categoryId })
        .withGraphFetched("products")

      if (!category) {
        throw new NotFoundError()
      }

      res.send({
        result: category,
      })
    },
  ],
})

export default handler
