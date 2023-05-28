import validate from "@/api/middlewares/validate"
import ContactModel from "@/api/db/models/ContactModel"
import { NotFoundError } from "@/api/errors"
import { numberValidator } from "@/components/validation/validation"
import mw from "@/api/mw"
import auth from "@/api/middlewares/auth"

const handler = mw({
  GET: [
    auth("admin"),
    validate({
      query: {
        contactId: numberValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { contactId },
      },
      res,
    }) => {
      const id = contactId

      const contact = await ContactModel.query().findOne({ id })

      if (!contact) {
        throw new NotFoundError()
      }

      res.send({
        result: contact,
      })
    },
  ],
  PATCH: [
    auth("admin"),
    validate({
      query: {
        contactId: numberValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { contactId },
      },
      res,
    }) => {
      const id = contactId

      const contact = await ContactModel.query().findOne({ id })

      if (!contact) {
        throw new NotFoundError()
      }

      const updatedContact = await ContactModel.query().updateAndFetchById(id, {
        read: contact.read ? 0 : 1,
      })

      res.send({
        result: updatedContact,
      })
    },
  ],
  DELETE: [
    auth("admin"),
    validate({
      query: {
        contactId: numberValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { contactId },
      },
      res,
    }) => {
      await ContactModel.query().deleteById(contactId)

      res.send({
        result: null,
      })
    },
  ],
})

export default handler
