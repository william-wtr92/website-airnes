import CarouselModel from "@/api/db/models/CarouselModel"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  urlValidator,
  labelValidator,
} from "@/components/validation/validation"
import auth from "@/api/middlewares/auth"

const handler = mw({
  POST: [
    auth("admin"),
    validate({
      body: {
        url: urlValidator.required(),
        label: labelValidator.required(),
      },
    }),
    async ({
      locals: {
        body: { url, label },
      },
      res,
    }) => {
      const maxOrder = await CarouselModel.query()
        .max("order as maxOrder")
        .first()
      const newOrder =
        maxOrder && maxOrder.maxOrder !== null ? maxOrder.maxOrder + 1 : 1

      await CarouselModel.query().insertAndFetch({
        url,
        label,
        order: newOrder,
      })

      res.send({ result: true })
    },
  ],
})

export default handler
