import ProductModel from "@/api/db/models/ProductModel"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  boolValidator,
  queryPageValidator,
} from "@/components/validation/validation"
import { NotFoundError } from "objection"
import config from "@/api/config"

const handler = mw({
  GET: [
    validate({
      query: {
        sale: boolValidator.optional(),
        page: queryPageValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { sale, page },
      },
      res,
    }) => {
      const limit = config.pagination.limit.default
      page = parseInt(page, 10) || 1
      const offset = (page - 1) * limit

      const productsQuery = ProductModel.query()
          .where("categoryId", "!=", 0)
          .where("quantity", ">", 0)

      if (sale) {
        productsQuery.where("promotion", ">", 0)
      }

      const checkLimit = await productsQuery.clone().orderBy("quantity", "asc").limit(limit).offset(offset)

      let products = await productsQuery
          .orderBy("quantity", "asc")
          .limit(limit)
          .offset(offset)

      if (checkLimit.length < limit) {
        const zeroQuantityProductsQuery = ProductModel.query()
            .where("categoryId", "!=", 0)
            .where("quantity", "=", 0)
            .limit(limit - products.length)
            .offset(offset)

        if (sale) {
          zeroQuantityProductsQuery.where("promotion", ">", 0)
        }

        const zeroQuantityProducts = await zeroQuantityProductsQuery
        products = products.concat(zeroQuantityProducts)
      }

      const totalCount = await ProductModel.query().count().first()

      const pagination = {
        page,
        limit,
        totalItems: parseInt(totalCount.count, 10),
        totalPages: Math.ceil(totalCount.count / limit),
      }

      if (!products) {
        throw new NotFoundError()
      }

      res.send({
        result: products,
        pagination: pagination,
      })
    },
  ],
})

export default handler
