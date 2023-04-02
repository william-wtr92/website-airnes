import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { numberValidator } from "@/components/validation/validation"
import CarouselModel from "@/api/db/models/CarouselModel"

const handler = mw({
  DELETE: [
    validate({
      query: {
        imageId: numberValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { imageId },
      },
      res,
    }) => {
      const id = imageId

      await CarouselModel.query().deleteById(id)

      res.send({ result: true })
    },
  ],
  PATCH: [
    validate({
      query: {
        imageId: numberValidator.required(),
      },
      body: {
        direction: numberValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { imageId },
        body: { direction },
      },
      res,
    }) => {
      const id = imageId
      const currentItem = await CarouselModel.query().findById(id)

      const newPosition = currentItem.order + direction

      if (newPosition < 1) {
        res.status(400).send({ error: "Invalid position" })

        return
      }

      const totalCount = await CarouselModel.query().resultSize()

      if (newPosition > totalCount) {
        res.status(400).send({ error: "Cannot move item down" })

        return
      }

      const targetItem = await CarouselModel.query().findOne({
        order: newPosition,
      })

      if (!currentItem || !targetItem) {
        res.status(400).send({ error: "Invalid ID or position" })

        return
      }

      await CarouselModel.query()
        .findById(currentItem.id)
        .patch({ order: targetItem.order })

      await CarouselModel.query()
        .findById(targetItem.id)
        .patch({ order: currentItem.order })

      res.send({ result: true })
    },
  ],
})

export default handler
