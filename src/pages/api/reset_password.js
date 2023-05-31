import UserModel from "@/api/db/models/UserModel"
import { InvalidCredentialsError } from "@/api/errors"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { mailValidator } from "@/components/validation/contact"
import sgMail from "@sendgrid/mail"
import jsonwebtoken from "jsonwebtoken"
import config from "@/api/config"
import { stringValidator } from "@/components/validation/validation"
import parseSession from "@/web/parseSession"
const { hashPassword } = require("@/api/db/hashPassword")

const handler = mw({
  POST: [
    validate({
      body: {
        mail: mailValidator.required(),
      },
    }),
    async ({
      locals: {
        body: { mail },
      },
      res,
    }) => {
      const user = await UserModel.query().findOne({ mail })

      if (!user) {
        throw new InvalidCredentialsError()
      }

      const tokken = jsonwebtoken.sign(
        {
          payload: {
            mail: mail,
          },
        },
        config.security.jwt.secret,
        { expiresIn: config.security.jwt.expiresIn }
      )

      sgMail.setApiKey(process.env.KEY_SEND_GRID)

      const sendGridMail = {
        to: mail,
        from: process.env.MAIL_SEND_GRID,
        templateId: "d-6bad8b034b8e40b3b64170469823f86a",
        dynamic_template_data: {
          fullname: user.name,
          tokken: tokken,
        },
      }

      await sgMail.send(sendGridMail)

      try {
        await sgMail.send(sendGridMail)
        res.send({ result: true })
      } catch {
        throw new InvalidCredentialsError()
      }
    },
  ],
  PATCH: [
    validate({
      body: {
        tokken: stringValidator.required(),
        password: stringValidator.required(),
      },
    }),
    async ({
      locals: {
        body: { tokken, password },
      },
      res,
    }) => {
      const email = parseSession(tokken)
      const mail = email.mail

      const user = await UserModel.query().findOne({ mail })

      if (!user) {
        throw new InvalidCredentialsError()
      }

      const [passwordHash, passwordSalt] = await hashPassword(password)

      try {
        await UserModel.query().updateAndFetchById(user.id, {
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
