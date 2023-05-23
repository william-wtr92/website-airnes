import UserModel from "@/api/db/models/UserModel"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  mailValidator,
  NameValidator,
  numberValidator,
} from "@/components/validation/validation"
import { NotFoundError } from "@/api/errors"
import auth from "@/api/middlewares/auth"

const handler = mw({
  GET: [
    validate({
      query: {
        userId: numberValidator.required(),
      },
    }),
    auth("user"),
    async ({
      locals: {
        query: { userId },
      },
      res,
    }) => {
      const id = userId

      const query = await UserModel.query()
        .findOne({ id })
        .select("mail", "name")
        .withGraphFetched("allData")

      if (query) {
        res.send({
          result: query,
        })
      } else {
        res.send({ result: null })

        throw new NotFoundError()
      }
    },
  ],
  PATCH: [
    validate({
      query: {
        userId: numberValidator.required(),
      },
      body: {
        name: NameValidator.required(),
        mail: mailValidator.required(),
      },
    }),
    auth("user"),
    async ({
      locals: {
        query: { userId },
        body: { name, mail },
      },
      res,
    }) => {
      const id = userId

      const user = await UserModel.query().findOne({ id })
      const emailVerif = await UserModel.query().findOne({ mail })

      try {
        if (!emailVerif || user.id === emailVerif.id) {
          await UserModel.query().updateAndFetchById(id, {
            ...(user.name != name ? { name } : {}),
            ...(user.mail != mail ? { mail } : {}),
          })
        }
      } catch {
        res.status(500).send({ error: "Oops. Something went wrong." })
      }

      res.send({ result: true })
    },
  ],
  DELETE: [
    validate({
      query: {
        userId: numberValidator.required(),
      },
    }),
    auth("user"),
    async ({
      locals: {
        query: { userId },
      },
      res,
    }) => {
      const id = userId

      await UserModel.query().deleteById(id)

      res.send({ result: true })
    },
  ],
})

export default handler
