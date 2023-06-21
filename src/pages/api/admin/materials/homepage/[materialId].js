import mw from "@/api/mw"
import validate from "@/api/middlewares/validate"
import { numberValidator } from "@/components/validation/validation"
import auth from "@/api/middlewares/auth"
import SelectedMaterialModel from "@/api/db/models/SelectedMaterialModel"

const handler = mw({
  PATCH: [
    auth("admin"),
    validate({
      query: {
        materialId: numberValidator.required(),
      },
      body: {
        direction: numberValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { materialId },
        body: { direction },
      },
      res,
    }) => {
      const id = materialId
      const currentItem = await SelectedMaterialModel.query().findById(id)

      const newPosition = currentItem.order + direction

      if (newPosition < 1) {
        res.status(400).send({ error: "Invalid position" })

        return
      }

      const totalCount = await SelectedMaterialModel.query().resultSize()

      if (newPosition > totalCount) {
        res.status(400).send({ error: "Cannot move item down" })

        return
      }

      const targetItem = await SelectedMaterialModel.query().findOne({
        order: newPosition,
      })

      if (!currentItem || !targetItem) {
        res.status(400).send({ error: "Invalid ID or position" })

        return
      }

      await SelectedMaterialModel.query()
        .findById(currentItem.id)
        .patch({ order: targetItem.order })

      await SelectedMaterialModel.query()
        .findById(targetItem.id)
        .patch({ order: currentItem.order })

      res.send({ result: true })
    },
  ],
  DELETE: [
    auth("admin"),
    validate({
      query: {
        materialId: numberValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { materialId },
      },
      res,
    }) => {
      const id = materialId

      const itemToDelete = await SelectedMaterialModel.query().findById(id)

      if (!itemToDelete) {
        res.status(400).send({ error: "Invalid ID" })

        return
      }

      await SelectedMaterialModel.query().deleteById(id)

      const itemsToReorder = await SelectedMaterialModel.query().where(
        "order",
        ">",
        itemToDelete.order
      )

      for (const item of itemsToReorder) {
        await SelectedMaterialModel.query()
          .findById(item.id)
          .patch({ order: item.order - 1 })
      }

      res.send({ result: true })
    },
  ],
})

export default handler
