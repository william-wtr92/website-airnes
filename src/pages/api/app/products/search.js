import ProductModel from "@/api/db/models/ProductModel"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  queryPageValidator,
  stringValidator,
} from "@/components/validation/validation"
import { NotFoundError } from "objection"

const handler = mw({
  GET: [
    validate({
      query: {
        page: queryPageValidator.optional(),
        search: stringValidator.optional(),
      },
    }),
    async ({
      locals: {
        query: { search, page },
      },
      res,
    }) => {
      const limit = 18
      page = parseInt(page, 10) || 1
      const offset = (page - 1) * limit

      const productsQuery = ProductModel.query()
        .where("categoryId", "!=", 0)
        .orderBy("id", "asc")
        .limit(limit)
        .offset(offset)

      if (search || search !== "") {
        productsQuery.andWhere(function () {
          this.where("name", "like", `%${search}%`).orWhere(
            "description",
            "like",
            `%${search}%`
          )
        })
      }

      const products = await productsQuery

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
