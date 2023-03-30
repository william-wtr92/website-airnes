import CategoryModel from "@/api/db/models/CategoryModel"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  linkValidator,
  stringValidator,
} from "@/components/validation/validation"
import parseSession from "@/web/parseSession"
import UserModel from "@/api/db/models/UserModel"

const handler = mw({
  POST: [
    validate({
      body: {
        image: linkValidator.required(),
        name: stringValidator.required(),
        description: stringValidator.required(),
      },
    }),
    async ({
      locals: {
        body: { image, name, description, jwt },
      },
      res,
    }) => {
      const session = parseSession(jwt.jwt)
      const id = session.user.id
      const user = await UserModel.query().findOne({ id })

      if (user.roleid !== 0) {
        res.status(403).send({ error: "You are not admin" })

        return
      }

      await CategoryModel.query().insertAndFetch({
        image,
        name,
        description,
      })
      res.send({ result: true })
    },
  ],
  GET: [
    async ({ res }) => {
      const query = await CategoryModel.query()

      if (query) {
        res.send({
          result: query,
        })
      } else {
        res.send({ result: "" })
      }
    },
  ],
})

export default handler
