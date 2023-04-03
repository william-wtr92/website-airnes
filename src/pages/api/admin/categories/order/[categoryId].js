import mw from "@/api/mw"
import validate from "@/api/middlewares/validate"
import { numberValidator } from "@/components/validation/validation"
import CategoryModel from "@/api/db/models/CategoryModel"

const handler = mw({
  PATCH: [
    validate({
      query: {
        categoryId: numberValidator.required(),
      },
      body: {
        direction: numberValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { categoryId },
        body: { direction },
      },
      res,
    }) => {
      const id = categoryId
      const currentItem = await CategoryModel.query().findById(id)

      const newPosition = currentItem.order + direction

      if (newPosition < 1) {
        res.status(400).send({ error: "Invalid position" })

        return
      }

      const totalCount = await CategoryModel.query().resultSize()

      if (newPosition > totalCount) {
        res.status(400).send({ error: "Cannot move item down" })

        return
      }

      const targetItem = await CategoryModel.query().findOne({
        order: newPosition,
      })

      if (!currentItem || !targetItem) {
        res.status(400).send({ error: "Invalid ID or position" })

        return
      }

      await CategoryModel.query()
        .findById(currentItem.id)
        .patch({ order: targetItem.order })

      await CategoryModel.query()
        .findById(targetItem.id)
        .patch({ order: currentItem.order })

      res.send({ result: true })
    },
  ],
})

export default handler
