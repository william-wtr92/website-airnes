import validate from "@/api/middlewares/validate"
import ContactModel from "@/api/db/models/ContactModel"
import {NotFoundError} from "@/api/errors"
import {numberValidator} from "@/components/validation/validation";
import mw from "@/api/mw"

const handler = mw({
  GET: [
    validate({
      query: {
        contactId: numberValidator.required(),
      },
    }),
    async ({
              locals: {
                query: {contactId},
              },
              res,
    }) => {
    const id = contactId

      const contact = await ContactModel.query().findOne({id})

      if (!contact) {
        res.send({result: null})

        throw new NotFoundError()
      }

      res.send({
        result: contact,
      })
    }
  ]
})

export default handler