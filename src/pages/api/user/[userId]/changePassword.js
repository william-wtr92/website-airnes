import UserModel from "@/api/db/models/UserModel"
import { InvalidCredentialsError, InvalidNewPasswordError } from "@/api/errors"
import auth from "@/api/middlewares/auth"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  numberValidator,
  stringValidator,
} from "@/components/validation/validation"
const { hashPassword } = require("@/api/db/hashPassword")

const handler = mw({
  PATCH: [
    auth("user"),
    validate({
      query: {
        userId: numberValidator.required(),
      },
      body: {
        password: stringValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { userId },
        body: { password },
      },
      res,
    }) => {
      const id = userId

      const user = await UserModel.query().findOne({ id })
      const samePassword = await user.checkPassword(password)

      if (samePassword) {
        throw new InvalidNewPasswordError()
      }

      const [passwordHash, passwordSalt] = await hashPassword(password)

      try {
        await UserModel.query().updateAndFetchById(id, {
          ...(user.passwordHash != passwordHash ? { passwordHash } : {}),
          ...(user.passwordSalt != passwordSalt ? { passwordSalt } : {}),
        })
      } catch {
        throw new InvalidCredentialsError()
      }

      res.send({ result: true })
    },
  ],
})

export default handler
