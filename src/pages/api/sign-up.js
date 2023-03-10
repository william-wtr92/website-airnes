import hashPassword from "@/api/db/hashPassword"
import UserModel from "@/api/db/models/UserModel"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  boolValidator,
  emailValidator,
  NameValidator,
  passwordValidator,
} from "@/components/validation/validation"

const handler = mw({
  POST: [
    validate({
      body: {
        name: NameValidator.required(),
        email: emailValidator.required(),
        password: passwordValidator.required(),
        passwordConfirmation: passwordValidator.required(),
        cgu: boolValidator.required(),
      },
    }),
    async ({
      locals: {
        body: { name, email, password, passwordConfirmation, cgu },
      },
      res,
    }) => {
      if (password != passwordConfirmation) {
        res.status(404).send({ error: "mdp différent" })

        return
      }

      if (!cgu) {
        res.status(404).send({ error: "CGU non accepté" })

        return
      }

      const user = await UserModel.query().findOne({ email })

      if (user) {
        res.send({ result: true })

        return
      }

      const [passwordHash, passwordSalt] = await hashPassword(password)

      await UserModel.query().insertAndFetch({
        name,
        email,
        passwordHash,
        passwordSalt,
      })

      res.send({ result: true })
    },
  ],
})

export default handler
