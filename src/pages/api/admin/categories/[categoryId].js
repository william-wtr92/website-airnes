import mw from "@/api/mw"
import validate from "@/api/middlewares/validate"
import {
  linkValidator,
  numberValidator,
  stringValidator,
} from "@/components/validation/validation"
import CategoryModel from "@/api/db/models/CategoryModel"
import { NotFoundError } from "@/api/errors"
import ProductModel from "@/api/db/models/ProductModel"
import { boolean } from "yup"
import auth from "@/api/middlewares/auth"

const handler = mw({
  GET: [
    auth("admin"),
    validate({
      query: {
        categoryId: numberValidator.required(),
        showProducts: boolean(),
      },
    }),
    async ({
      locals: {
        query: { categoryId, showProducts },
      },
      res,
    }) => {
      const id = categoryId

      const category = await CategoryModel.query().findOne({ id })

      if (!category) {
        throw new NotFoundError()
      }

      if (showProducts) {
        const products = await ProductModel.query().where({ categoryId: id })

        res.send({
          result: {
            ...category,
            products,
          },
        })
      }

      res.send({
        result: category,
      })
    },
  ],
  PATCH: [
    auth("admin"),
    validate({
      query: {
        categoryId: numberValidator.required(),
      },
      body: {
        image: linkValidator,
        name: stringValidator,
        description: stringValidator,
      },
    }),
    async ({
      locals: {
        query: { categoryId },
        body: { image, name, description },
      },
      res,
    }) => {
      const id = categoryId

      const noCategory = await CategoryModel.query().findOne({
        name: "No category",
      })

      const noCategoryId = parseInt(noCategory.id, 10)

      if (id === noCategoryId) {
        res.status(400).send({ error: "Can't delete this category" })

        return
      }

      const category = await CategoryModel.query().findOne({ id })

      await CategoryModel.query().updateAndFetchById(id, {
        ...(category.image !== image ? { image } : {}),
        ...(category.name !== name ? { name } : {}),
        ...(category.description !== description ? { description } : {}),
      })

      res.send({ result: true })
    },
  ],
  DELETE: [
    auth("admin"),
    validate({
      query: {
        categoryId: numberValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { categoryId },
      },
      res,
    }) => {
      const id = categoryId

      const noCategory = await CategoryModel.query().findOne({
        name: "No category",
      })

      const noCategoryId = parseInt(noCategory.id, 10)

      if (id === noCategoryId) {
        res.status(400).send({ error: "Can't delete this category" })

        return
      }

      await ProductModel.query().update({ categoryId: noCategoryId })

      await CategoryModel.query().findOne({ id }).del()

      res.send({ result: true })
    },
  ],
})

export default handler
