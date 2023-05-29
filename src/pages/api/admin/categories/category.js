import CategoryModel from "@/api/db/models/CategoryModel"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  linkValidator,
  queryPageValidator,
  stringValidator,
} from "@/components/validation/validation"
import { NotFoundError } from "@/api/errors"
import config from "@/api/config"
import auth from "@/api/middlewares/auth"

const handler = mw({
  POST: [
    auth("admin"),
    validate({
      body: {
        image: linkValidator.required(),
        name: stringValidator.required(),
        description: stringValidator.required(),
      },
    }),
    async ({
      locals: {
        body: { image, name, description },
      },
      res,
    }) => {
      await CategoryModel.query().insertAndFetch({
        image,
        name,
        description,
      })

      res.send({ result: true })
    },
  ],
  GET: [
    auth("admin"),
    validate({
      query: {
        page: queryPageValidator.optional(),
        order: stringValidator.optional(),
        col: stringValidator.optional(),
      },
    }),
    async ({
      locals: {
        query: { page, order, col },
      },
      res,
    }) => {
      let categories
      let pagination

      const column = col || "id"
      const orderCol = order || "asc"

      if (page) {
        const limit = config.pagination.limit.default
        const offset = (page - 1) * limit

        categories = await CategoryModel.query()
          .orderBy(column, orderCol)
          .limit(limit)
          .offset(offset)
        const totalCount = await CategoryModel.query().count().first()

        pagination = {
          page,
          limit,
          totalItems: parseInt(totalCount.count, 10),
          totalPages: Math.ceil(totalCount.count / limit),
        }
      } else {
        categories = await CategoryModel.query().orderBy(column, orderCol)
      }

      if (!categories) {
        throw new NotFoundError()
      }

      res.send({
        result: categories,
        pagination: pagination,
      })
    },
  ],
})

export default handler
