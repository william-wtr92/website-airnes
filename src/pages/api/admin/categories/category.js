import CategoryModel from "@/api/db/models/CategoryModel"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  linkValidator,
  queryPageValidator,
  stringValidator,
} from "@/components/validation/validation"
import parseSession from "@/web/parseSession"
import UserModel from "@/api/db/models/UserModel"
import { NotFoundError } from "@/api/errors"
import config from "@/api/config"

const handler = mw({
  POST: [
    validate({
      body: {
        image: linkValidator.required(),
        name: stringValidator.required(),
        description: stringValidator.required(),
      },
    }),
    async ({
      locals: {
        body: { image, name, description, jwt },
      },
      res,
    }) => {
      const session = parseSession(jwt.jwt)
      const id = session.user.id
      const user = await UserModel.query().findOne({ id })

      if (user.roleid !== 1) {
        res.status(403).send({ error: "You are not admin" })

        return
      }

      await CategoryModel.query().insertAndFetch({
        image,
        name,
        description,
      })
      res.send({ result: true })
    },
  ],
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
      let categories
      let pagination

      if (page) {
        const limit = config.pagination.limit.default
        const offset = (page - 1) * limit

        categories = await CategoryModel.query()
          .orderBy(col, order)
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
        categories = await CategoryModel.query().orderBy(col, order)
      }

      if (categories) {
        res.send({
          result: categories,
          pagination: pagination,
        })
      } else {
        res.send({ result: "" })

        throw new NotFoundError()
      }
    },
  ],
})

export default handler
