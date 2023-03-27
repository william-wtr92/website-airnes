import mw from "@/api/mw"
import validate from "@/api/middlewares/validate"
import {numberValidator} from "@/components/validation/validation"
import CategoryModel from "@/api/db/models/CategoryModel"
import {NotFoundError} from "@/api/errors"

const handler = mw({
  GET: [
    validate({
      query: {
        categoryId: numberValidator.required(),
      },
    }),
    async ({
             locals: {
               query: {categoryId},
             },
             res,
           }) => {
      const id = categoryId

      const category = await CategoryModel.query()
        .findOne({id})

      if (category) {
        res.send({
          result: category,
        })
      } else {
        res.send({result: null})
      }
    },
  ],
})

export default handler