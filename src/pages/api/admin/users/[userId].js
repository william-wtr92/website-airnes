import mw from "@/api/mw"
import validate from "@/api/middlewares/validate"
import { numberValidator } from "@/components/validation/validation"
import { NotFoundError } from "@/api/errors"
import UserModel from "@/api/db/models/UserModel"
import RoleModel from "@/api/db/models/RoleModel"
import auth from "@/api/middlewares/auth"

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
      const user = await UserModel.query().findOne({ id }).select("roleid")
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
        roleid: numberValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { userId },
        body: { roleid },
      },
      res,
    }) => {
      const id = userId

      const user = await UserModel.query().findOne({ id })

      try {
        await UserModel.query().updateAndFetchById(id, {
          ...(user.roleid !== roleid ? { roleid } : {}),
        })
      } catch {
        res.status(500).send({ error: "Oops. Something went wrong." })
      }

      res.send({ result: true })
    },
  ],
})

export default handler
