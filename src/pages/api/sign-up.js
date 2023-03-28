import hashPassword from "@/api/db/hashPassword"
import UserModel from "@/api/db/models/UserModel"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  boolValidator,
  mailValidator,
  NameValidator,
  passwordValidator,
} from "@/components/validation/validation"

const handler = mw({
  POST: [
    validate({
      body: {
        name: NameValidator.required(),
        mail: mailValidator.required(),
        password: passwordValidator.required(),
        passwordConfirmation: passwordValidator.required(),
        cgu: boolValidator.required(),
      },
    }),
    async ({
      locals: {
        body: { name, email, password },
      },
      res,
    }) => {
      const user = await UserModel.query().findOne({ email })

      if (user) {
        res.send({ result: true })

        return
      }

      const [passwordHash, passwordSalt] = await hashPassword(password)

      await UserModel.query().insertAndFetch({
        name,
        mail,
        passwordHash,
        passwordSalt,
      })

      res.send({ result: true })
    },
  ],
})

export default handler
