import ProductModel from "@/api/db/models/ProductModel"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  boolValidator,
  numberValidator,
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
        promo: boolValidator.optional(),
        stock: boolValidator.optional(),
        category: numberValidator.optional(),
        material: numberValidator.optional(),
        order: stringValidator.optional(),
        minPrice: numberValidator.optional(),
        maxPrice: numberValidator.optional(),
      },
    }),
    async ({
      locals: {
        query: {
          search,
          page,
          promo,
          stock,
          category,
          material,
          order,
          minPrice,
          maxPrice,
        },
      },
      res,
    }) => {
      const limit = 18
      page = parseInt(page, 10) || 1
      const offset = (page - 1) * limit

      const orderColumn = order ? "price" : "id"
      const orderBy = order || "asc"

      const productsQuery = ProductModel.query()
        .where("categoryId", "!=", 0)
        .orderBy(orderColumn, orderBy)
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

      if (promo === true) {
        productsQuery.where("promotion", "!=", 0)
      }

      if (stock === true) {
        productsQuery.where("quantity", "!=", 0)
      }

      if (category && category !== 0) {
        productsQuery.where("categoryId", "=", category)
      }

      if (material && material !== 0) {
        productsQuery.where("materialId", "=", material)
      }

      if (minPrice && minPrice !== 0) {
        productsQuery.where("price", ">=", minPrice)
      }

      if (maxPrice && maxPrice !== 0) {
        productsQuery.where("price", "<=", maxPrice)
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
