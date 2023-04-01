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
})

export default handler
