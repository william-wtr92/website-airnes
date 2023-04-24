import UserModel from "@/api/db/models/UserModel"
import { InvalidCredentialsError } from "@/api/errors"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  boolValidator,
  mailValidator,
  NameValidator,
  passwordValidator,
} from "@/components/validation/validation"
import sgMail from "@sendgrid/mail"

const { hashPassword } = require("@/api/db/hashPassword")

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
        body: { name, mail, password },
      },
      res,
    }) => {
      const user = await UserModel.query().findOne({ mail })

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

      sgMail.setApiKey(process.env.KEY_SEND_GRID)

      const sendGridMail = {
        to: mail,
        from: process.env.MAIL_SEND_GRID,
        templateId: "d-f38671e3147741b4ba1c0968ec6702f4",
        dynamic_template_data: {
          fullname: name,
        },
      }

      try {
        await sgMail.send(sendGridMail)
        res.send({ result: true })
      } catch {
        throw new InvalidCredentialsError()
      }
    },
  ],
})

export default handler
