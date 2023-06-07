import ProductModel from "@/api/db/models/ProductModel"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  arrayValidator,
  numberValidator,
  queryPageValidator,
  stringValidator,
} from "@/components/validation/validation"
import { NotFoundError } from "objection"
import config from "@/api/config"
import auth from "@/api/middlewares/auth"
import {InvalidArgumentError} from "@/api/errors"

const handler = mw({
  POST: [
    auth("admin"),
    validate({
      body: {
        image: arrayValidator.required(),
        category: numberValidator.required(),
        name: stringValidator.required(),
        price: numberValidator.required(),
        promotion: numberValidator.required(),
        quantity: numberValidator.required(),
        description: stringValidator.required(),
        material: numberValidator.required(),
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
               },
             },
             res,
           }) => {
      const categoryId = parseInt(category)
      const materialId = parseInt(material)

      try {
        const product = await ProductModel.query().insertAndFetch({
          name,
          description,
          price,
          image: JSON.stringify([]),
          promotion,
          quantity,
          categoryId,
          materialId,
        })

        await ProductModel.query().patchAndFetchById(product.id, {
          image: JSON.stringify(image),
        })
      } catch {
        throw new InvalidArgumentError()
      }


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
        products = await ProductModel.query().orderBy(
          col ? col : "id",
          order ? order : "asc"
        )
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
