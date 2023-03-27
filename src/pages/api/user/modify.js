import UserModel from "@/api/db/models/UserModel"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  emailValidator,
  NameValidator,
} from "@/components/validation/validation"
import parseSession from "@/web/parseSession"

const handler = mw({
  POST: [
    //rajouter auth
    validate({
      body: {
        name: NameValidator.required(),
        email: emailValidator.required(),
      },
    }),
    async ({
      locals: {
        body: { name, email, jwt },
      },
      res,
    }) => {
      const session = parseSession(jwt.jwt)
      const id = session.user.id

      const user = await UserModel.query().findOne({ id })
      const emailverif = await UserModel.query().findOne({ email })

      try {
        if (!emailverif || user.id === emailverif.id) {
          await UserModel.query().updateAndFetchById(id, {
            ...(user.name != name ? { name } : {}),
            ...(user.email != email ? { email } : {}),
          })
        }
      } catch {
        res.status(500).send({ error: "Oops. Something went wrong." })
      }

      res.send({ result: true })
    },
  ],
})

export default handler
