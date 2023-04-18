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
      page = parseInt(page, 20) || 1
      const offset = (page - 1) * limit

      const productsQuery = ProductModel.query()
        .where("categoryId", "!=", 0)
        .orderBy("id", "asc")
        .limit(limit)
        .offset(offset)

      const allProductQuery = ProductModel.query()
          .where("categoryId", "!=", 0)
          .orderBy("id", "asc")

      if (sale) {
        productsQuery.andWhere("promotion", ">", 0)
      }

      const products = await productsQuery

      const allProduct = await allProductQuery

      const totalCount = await ProductModel.query().count().first()

      const pagination = {
        page,
        limit,
        totalItems: parseInt(totalCount.count, 20),
        totalPages: Math.ceil(totalCount.count / limit),
      }

      if (products) {
        res.send({
          result: products,
          pagination: pagination,
          allProduct: allProduct,
        })

        return
      }

      res.send({ result: "" })

      throw new NotFoundError()
    },
  ],
})

export default handler
