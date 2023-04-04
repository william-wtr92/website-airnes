import mw from "@/api/mw"
import validate from "@/api/middlewares/validate"
import { numberValidator } from "@/components/validation/validation"
import SelectedProductModel from "@/api/db/models/SeletedProductModel"

const handler = mw({
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
      const currentItem = await SelectedProductModel.query().findById(id)

      const newPosition = currentItem.order + direction

      if (newPosition < 1) {
        res.status(400).send({ error: "Invalid position" })

        return
      }

      const totalCount = await SelectedProductModel.query().resultSize()

      if (newPosition > totalCount) {
        res.status(400).send({ error: "Cannot move item down" })

        return
      }

      const targetItem = await SelectedProductModel.query().findOne({
        order: newPosition,
      })

      if (!currentItem || !targetItem) {
        res.status(400).send({ error: "Invalid ID or position" })

        return
      }

      await SelectedProductModel.query()
        .findById(currentItem.id)
        .patch({ order: targetItem.order })

      await SelectedProductModel.query()
        .findById(targetItem.id)
        .patch({ order: currentItem.order })

      res.send({ result: true })
    },
  ],
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

      const itemToDelete = await SelectedProductModel.query().findById(id)

      if (!itemToDelete) {
        res.status(400).send({ error: "Invalid ID" })

        return
      }

      await SelectedProductModel.query().deleteById(id)

      const itemsToReorder = await SelectedProductModel.query().where(
        "order",
        ">",
        itemToDelete.order
      )

      for (const item of itemsToReorder) {
        await SelectedProductModel.query()
          .findById(item.id)
          .patch({ order: item.order - 1 })
      }

      res.send({ result: true })
    },
  ],
})

export default handler
