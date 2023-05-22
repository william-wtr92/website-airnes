import config from "@/api/config"
import UserModel from "@/api/db/models/UserModel"
import { NotFoundError } from "@/api/errors"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  queryPageValidator,
  stringValidator,
} from "@/components/validation/validation"

const handler = mw({
  GET: [
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

      const user = await UserModel.query()
        .limit(limit)
        .offset(offset)
        .modify("sanitize")
        .withGraphFetched("roleData")
        .orderBy(col, order)

      const totalCount = await UserModel.query().count().first()

      const newUser = user.map((item) => ({
        ...item,
        right: item.roleData.right,
      }))

      if (newUser) {
        res.send({
          result: newUser,
          pagination: {
            page,
            limit,
            totalItems: parseInt(totalCount.count, 10),
            totalPages: Math.ceil(totalCount.count / limit),
          },
        })
      } else {
        res.send({ result: "" })

        throw new NotFoundError()
      }
    },
  ],
})

export default handler
