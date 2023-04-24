import ProductModel from "@/api/db/models/ProductModel"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  linkValidator,
  numberValidator,
  queryPageValidator,
  stringValidator,
} from "@/components/validation/validation"
import parseSession from "@/web/parseSession"
import UserModel from "@/api/db/models/UserModel"
import { NotFoundError } from "objection"
import config from "@/api/config"

const handler = mw({
  POST: [
    validate({
      body: {
        image: linkValidator.required(),
        category: numberValidator.required(),
        name: stringValidator.required(),
        price: numberValidator.required(),
        promotion: numberValidator.required(),
        quantity: numberValidator.required(),
        description: stringValidator.required(),
        material: stringValidator.required(),
      },
    }),
    async ({
      locals: {
        body: {
          image,
          name,
          description,
          category,
          price,
          promotion,
          quantity,
          material,
          jwt,
        },
      },
      res,
    }) => {
      const session = parseSession(jwt.jwt)
      const id = session.user.id
      const user = await UserModel.query().findOne({ id })

      const categoryId = parseInt(category)
      const materialId = parseInt(material)

      if (user.roleid !== 1) {
        res.status(403).send({ error: "You are not admin" })

        return
      }

      await ProductModel.query().insertAndFetch({
        image,
        categoryId,
        price,
        promotion,
        quantity,
        name,
        description,
        materialId,
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
      let products
      let pagination

      if (page) {
        const limit = config.pagination.limit.default
        const offset = (page - 1) * limit

        products = await ProductModel.query()
          .orderBy(col, order)
          .limit(limit)
          .offset(offset)
        const totalCount = await ProductModel.query().count().first()

        pagination = {
          page,
          limit,
          totalItems: parseInt(totalCount.count, 10),
          totalPages: Math.ceil(totalCount.count / limit),
        }
      } else {
        products = await ProductModel.query().orderBy(col, order)
      }

      if (products) {
        res.send({
          result: products,
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
