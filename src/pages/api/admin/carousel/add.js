import CarouselModel from "@/api/db/models/CarouselModel"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  urlValidator,
  labelValidator,
} from "@/components/validation/validation"
import parseSession from "@/web/parseSession"
import UserModel from "@/api/db/models/UserModel"

const handler = mw({
  POST: [
    validate({
      body: {
        url: urlValidator.required(),
        label: labelValidator.required(),
      },
    }),
    async ({
      locals: {
        body: { url, label, jwt },
      },
      res,
    }) => {
      const session = parseSession(jwt.jwt)
      const id = session.user.id
      const user = await UserModel.query().findOne({ id })

      if (user.roleid !== 1) {
        res.status(403).send({ error: "You are not admin" })

        return
      }

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
