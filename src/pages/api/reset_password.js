import UserModel from "@/api/db/models/UserModel"
import { InvalidCredentialsError } from "@/api/errors"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { mailValidator } from "@/components/validation/contact"
import sgMail from "@sendgrid/mail"
import jsonwebtoken from "jsonwebtoken"
import config from "@/api/config"

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
})

export default handler
