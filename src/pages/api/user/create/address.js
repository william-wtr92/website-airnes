import UserModel from "@/api/db/models/UserModel"
import AddressModel from "@/api/db/models/AddressModel"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { stringValidator } from "@/components/validation/validation"
import { NotFoundError } from "@/api/errors"
import { getSessionFromCookiesServ } from "@/web/helper/getSessionFromCookiesServ"
import auth from "@/api/middlewares/auth"

const handler = mw({
  POST: [
    validate({
      body: {
        name: stringValidator.required(),
        lastName: stringValidator.required(),
        addressName: stringValidator.required(),
        address: stringValidator.required(),
        complete: stringValidator,
        city: stringValidator.required(),
        postal_code: stringValidator.required(),
      },
    }),
    auth("user"),
    async ({
      req,
      locals: {
        body: {
          name,
          lastName,
          addressName,
          address,
          complete,
          city,
          postal_code,
        },
      },
      res,
    }) => {
      const sessionFromCookies = getSessionFromCookiesServ(req)

      const id = sessionFromCookies.user.id

      const user = await UserModel.query().findOne({ id })

      if (!user) {
        throw new NotFoundError()
      }

      await AddressModel.query().insertAndFetch({
        name,
        lastName,
        addressName,
        address,
        complete,
        city,
        postal_code,
        userid: id,
      })
      res.send({ result: true })
    },
  ],
})

export default handler
