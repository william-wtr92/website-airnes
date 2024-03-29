import ProductModel from "@/api/db/models/ProductModel"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  boolValidator,
  numberValidator,
  queryPageValidator,
  stringValidator
} from "@/components/validation/validation"
import { NotFoundError } from "objection"
import CategoryModel from "@/api/db/models/CategoryModel"

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
        maxPrice: numberValidator.optional()
      }
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
                 maxPrice
               }
             },
             res
           }) => {
      const limit = 18
      page = parseInt(page, 10) || 1
      const offset = (page - 1) * limit

      const [noCategory] = await CategoryModel.query().where("name", "=", "No category")

      const productsQuery = ProductModel.query()
        .where("categoryId", "!=", noCategory.id)

      const applyFilters = (query) => {
        if (search || search !== "") {
          query.andWhere(function () {
            this.where("name", "like", `%${search}%`).orWhere(
              "description",
              "like",
              `%${search}%`
            )
          })
        }

        if (promo === true) {
          query.where("promotion", "!=", 0)
        }

        if (category && category !== 0) {
          query.where("categoryId", "=", category)
        }

        if (material && material !== 0) {
          query.where("materialId", "=", material)
        }

        if (minPrice && minPrice !== 0) {
          query.where(function() {
            this.where("promotion", ">=", minPrice)
                .andWhere("promotion", ">", 0)
                .orWhere(function() {
                  this.where("price", ">=", minPrice)
                })
          })
        }

        if (maxPrice && maxPrice !== 0) {
          query.where(function() {
            this.where("promotion", ">=", maxPrice)
                .andWhere("promotion", ">", 0)
                .orWhere(function() {
                  this.where("price", ">=", maxPrice)
                })
          })
        }
      }

      applyFilters(productsQuery)

      if (stock === true) {
        productsQuery.where("quantity", ">", 0)
      }

      const totalCount = await productsQuery.clone().count("id as total").first()
      const total = parseInt(totalCount.total, 10)

      let products

      if (order) {
        products = await productsQuery
            .orderByRaw("CASE WHEN promotion > 0 THEN promotion ELSE price END " + order)
            .limit(limit)
            .offset(offset)
      } else {
        products = await productsQuery
            .orderBy("priority", "desc")
            .orderBy("quantity", "asc")
            .limit(limit)
            .offset(offset)
      }

      if (products.length < limit && stock !== true) {
        const zeroQuantityProductsQuery = ProductModel.query()
          .where("categoryId", "!=", 0)
          .where("quantity", "=", 0)
          .limit(limit - products.length)
          .offset(offset)

        applyFilters(zeroQuantityProductsQuery)

        const zeroQuantityProducts = await zeroQuantityProductsQuery

        products = products.concat(zeroQuantityProducts)
      }

      const pagination = {
        page,
        limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit)
      }

      if (!products) {
        throw new NotFoundError()
      }

      res.send({
        result: products,
        pagination: pagination
      })
    }
  ]
})

export default handler
