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

      await CarouselModel.query().insertAndFetch({ url, label })

      res.send({ result: true })
    },
  ],
})

export default handler
