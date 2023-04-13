import config from "@/api/config"
import UserModel from "@/api/db/models/UserModel"
import { NotFoundError } from "@/api/errors"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { queryPageValidator } from "@/components/validation/validation"

const handler = mw({
  GET: [
    validate({
      query: {
        page: queryPageValidator,
      },
    }),
    async ({
      locals: {
        query: { page },
      },
      res,
    }) => {
      const limit = config.pagination.limit.default
      const offset = (page - 1) * limit

      const user = await UserModel.query()
        .orderBy("id", "asc")
        .limit(limit)
        .offset(offset)
        .modify("sanitize")
        .withGraphFetched("roledata")

      const totalCount = await UserModel.query().count().first()

      const newUser = user.map((item) => ({
        ...item,
        right: item.roledata.right,
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
