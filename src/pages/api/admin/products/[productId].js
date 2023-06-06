import mw from "@/api/mw"
import validate from "@/api/middlewares/validate"
import {
  arrayValidator,
  numberValidator,
  stringValidator,
} from "@/components/validation/validation"
import {InvalidArgumentError, NotFoundError} from "@/api/errors"
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
        image: arrayValidator.required(),
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

      try {
        await ProductModel.query().patchAndFetchById(id, {
          ...(product.name !== name ? { name } : {}),
          ...(product.description !== description ? { description } : {}),
          ...(product.categoryId !== categoryId ? { categoryId } : {}),
          ...(product.price !== price ? { price } : {}),
          ...(product.promotion !== promotion ? { promotion } : {}),
          ...(product.quantity !== quantity ? { quantity } : {}),
          ...(product.materialId !== materialId ? { materialId } : {}),
        })

        if(JSON.stringify(product.image) !== JSON.stringify(image)) {
          await ProductModel.query().patchAndFetchById(id, {
            image: JSON.stringify(image),
          })
        }
      } catch {
        throw new InvalidArgumentError()
      }

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
