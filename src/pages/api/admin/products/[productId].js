import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { numberValidator } from "@/components/validation/validation"
import ProductModel from "@/api/db/models/ProductModel"

const handler = mw({
  DELETE: [
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

      await ProductModel.query().deleteById(id)

      res.send({ result: true })
    },
  ],
  PATCH: [
    validate({
      query: {
        productId: numberValidator.required(),
      },
      body: {
        direction: numberValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { productId },
        body: { direction },
      },
      res,
    }) => {
      const id = productId
      const currentItem = await ProductModel.query().findById(id)

      const newPosition = currentItem.order + direction

      if (newPosition < 1) {
        res.status(400).send({ error: "Invalid position" })

        return
      }

      const totalCount = await ProductModel.query().resultSize()

      if (newPosition > totalCount) {
        res.status(400).send({ error: "Cannot move item down" })

        return
      }

      const targetItem = await ProductModel.query().findOne({
        order: newPosition,
      })

      if (!currentItem || !targetItem) {
        res.status(400).send({ error: "Invalid ID or position" })

        return
      }

      await ProductModel.query()
        .findById(currentItem.id)
        .patch({ order: targetItem.order })

      await ProductModel.query()
        .findById(targetItem.id)
        .patch({ order: currentItem.order })

      res.send({ result: true })
    },
  ],
})

export default handler
