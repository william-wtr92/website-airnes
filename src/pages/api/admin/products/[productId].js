import mw from "@/api/mw"
import validate from "@/api/middlewares/validate"
import {
  linkValidator,
  numberValidator,
  stringValidator,
} from "@/components/validation/validation"
import { NotFoundError } from "@/api/errors"
import ProductModel from "@/api/db/models/ProductModel"
import auth from "@/api/middlewares/auth"
import SelectedProductModel from "@/api/db/models/SeletedProductModel"

const handler = mw({
  GET: [
    auth("admin"),
    validate({
      query: {
        productId: numberValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { productId },
      },
      res,
    }) => {
      const id = productId

      const product = await ProductModel.query().findOne({ id })

      if (!product) {
        throw new NotFoundError()
      }

      res.send({
        result: product,
      })
    },
  ],
  PATCH: [
    auth("admin"),
    validate({
      query: {
        productId: numberValidator.required(),
      },
      body: {
        image: linkValidator.required(),
        categoryId: numberValidator.required(),
        name: stringValidator.required(),
        price: numberValidator.required(),
        promotion: numberValidator.required(),
        quantity: numberValidator.required(),
        description: stringValidator.required(),
        materialId: numberValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { productId },
        body: {
          image,
          name,
          description,
          categoryId,
          price,
          promotion,
          quantity,
          materialId,
        },
      },
      res,
    }) => {
      const id = productId
      const product = await ProductModel.query().findOne({ id })

      await ProductModel.query().updateAndFetchById(id, {
        ...(product.image !== image ? { image } : {}),
        ...(product.name !== name ? { name } : {}),
        ...(product.description !== description ? { description } : {}),
        ...(product.categoryId !== categoryId ? { categoryId } : {}),
        ...(product.price !== price ? { price } : {}),
        ...(product.promotion !== promotion ? { promotion } : {}),
        ...(product.quantity !== quantity ? { quantity } : {}),
        ...(product.materialId !== materialId ? { materialId } : {}),
      })

      res.send({ result: true })
    },
  ],
  DELETE: [
    auth("admin"),
    validate({
      query: {
        productId: numberValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { productId },
      },
      res,
    }) => {
      const id = productId

      await SelectedProductModel.query()
        .where({ product_id: id })
        .del()

      await ProductModel.query().deleteById(id)

      res.send({ result: true })
    },
  ],
})

export default handler
