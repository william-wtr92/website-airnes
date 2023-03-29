import mw from "@/api/mw"
import validate from "@/api/middlewares/validate"
import {linkValidator, numberValidator, stringValidator} from "@/components/validation/validation"
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

      if (!category) {
        res.send({result: null})

        throw new NotFoundError()
      }

      res.send({
        result: category,
      })
    },
  ],
  PATCH: [
    validate({
      query: {
        categoryId: numberValidator.required()
      },
      body: {
        image: linkValidator,
        name: stringValidator,
        description: stringValidator,
      },
    }),
    async ({
             locals: {
               query: {categoryId},
               body: {
                 image,
                 name,
                 description
               },
             },
             res,
           }) => {
      const id = categoryId
      const category = await CategoryModel.query().findOne({id})

      await CategoryModel.query().updateAndFetchById(id, {
        ...(category.image !== image ? {image} : {}),
        ...(category.name !== name ? {name} : {}),
        ...(category.description !== description ? {description} : {})
      })

      res.send({result: true})
    }
  ],
})

export default handler