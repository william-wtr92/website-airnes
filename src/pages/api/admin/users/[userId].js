import mw from "@/api/mw"
import validate from "@/api/middlewares/validate"
import {
  numberValidator,
  stringValidator,
} from "@/components/validation/validation"
import { NotFoundError } from "@/api/errors"
import UserModel from "@/api/db/models/UserModel"
import RoleModel from "@/api/db/models/RoleModel"
import auth from "@/api/middlewares/auth"
import { mailValidator } from "@/components/validation/contact"

const handler = mw({
  GET: [
    auth("admin"),
    validate({
      query: {
        userId: numberValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { userId },
      },
      res,
    }) => {
      const id = userId
      const user = await UserModel.query()
        .findOne({ id })
        .modify("sanitizeEditAdmin")
      const role = await RoleModel.query()

      if (!user) {
        throw new NotFoundError()
      }

      res.send({
        result: user,
        role,
      })
    },
  ],
  PATCH: [
    auth("admin"),
    validate({
      query: {
        userId: numberValidator.required(),
      },
      body: {
        roleid: numberValidator,
        name: stringValidator.required(),
        mail: mailValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { userId },
        body: { roleid, name, mail },
      },
      res,
    }) => {
      const id = userId

      const user = await UserModel.query().findOne({ id })

      try {
        await UserModel.query().updateAndFetchById(id, {
          ...(user.roleid !== roleid ? { roleid } : {}),
          ...(user.mail !== mail ? { mail } : {}),
          ...(user.name !== name ? { name } : {}),
        })
      } catch {
        res.status(500).send({ error: "Oops. Something went wrong." })
      }

      res.send({ result: true })
    },
  ],
})

export default handler
