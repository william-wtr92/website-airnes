import ContactModel from "@/api/db/models/ContactModel"
import mw from "@/api/mw"
import { NotFoundError } from "@/api/errors"
import config from "@/api/config"
import validate from "@/api/middlewares/validate"
import {
  queryPageValidator,
  stringValidator,
} from "@/components/validation/validation"
import auth from "@/api/middlewares/auth"

const handler = mw({
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
      const limit = config.pagination.limit.default
      const offset = (page - 1) * limit

      const contacts = await ContactModel.query()
        .orderBy(col, order)
        .limit(limit)
        .offset(offset)

      if (!contacts) {
        throw new NotFoundError()
      }

      const totalCount = await ContactModel.query().count().first()
      res.send({
        result: contacts,
        pagination: {
          page,
          limit,
          totalItems: parseInt(totalCount.count, 10),
          totalPages: Math.ceil(totalCount.count / limit),
        },
      })
    },
  ],
})

export default handler
