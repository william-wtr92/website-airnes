import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  queryPageValidator,
  stringValidator,
} from "@/components/validation/validation"
import { NotFoundError } from "@/api/errors"
import config from "@/api/config"
import auth from "@/api/middlewares/auth"
import MaterialModel from "@/api/db/models/MaterialModel"

const handler = mw({
  POST: [
    auth("admin"),
    validate({
      body: {
        name: stringValidator.required(),
        description: stringValidator.required(),
      },
    }),
    async ({
             locals: {
               body: { name, description },
             },
             res,
           }) => {
      await MaterialModel.query().insertAndFetch({
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
      let materials
      let pagination

      const column = col || "id"
      const orderCol = order || "asc"

      if (page) {
        const limit = config.pagination.limit.default
        const offset = (page - 1) * limit

        materials = await MaterialModel.query()
            .orderBy(column, orderCol)
            .limit(limit)
            .offset(offset)
        const totalCount = await MaterialModel.query().count().first()

        pagination = {
          page,
          limit,
          totalItems: parseInt(totalCount.count, 10),
          totalPages: Math.ceil(totalCount.count / limit),
        }
      } else {
        materials = await MaterialModel.query().orderBy(column, orderCol)
      }

      if (!materials) {
        throw new NotFoundError()
      }

      res.send({
        result: materials,
        pagination: pagination,
      })
    },
  ],
})

export default handler
