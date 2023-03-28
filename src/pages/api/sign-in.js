import config from "@/api/config"
import UserModel from "@/api/db/models/UserModel"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  mailValidator,
  stringValidator,
} from "@/components/validation/validation"
import jsonwebtoken from "jsonwebtoken"
import {InvalidCredentialsError} from "@/api/errors"

const handler = mw({
  POST: [
    validate({
      body: {
        mail: mailValidator.required(),
        password: stringValidator.required(),
      },
    }),
    async ({
      locals: {
        body: { mail, password },
      },
      res,
    }) => {
      const user = await UserModel.query().findOne({ mail })

      const validity = await user.checkPassword(password)

      if (!user || !validity) {
        throw new InvalidCredentialsError()
      }

      const jwt = jsonwebtoken.sign(
        {
          payload: {
            user: {
              id: user.id,
            },
          },
        },
        config.security.jwt.secret,
        { expiresIn: config.security.jwt.expiresIn }
      )

      res.send({ result: jwt })
    },
  ],
})

export default handler
