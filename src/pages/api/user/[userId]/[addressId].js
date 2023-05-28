import AddressModel from "@/api/db/models/AddressModel"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  numberValidator,
  stringValidator,
} from "@/components/validation/validation"
import auth from "@/api/middlewares/auth"

const handler = mw({
  GET: [
    auth("user"),
    validate({
      query: {
        addressId: numberValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { addressId },
      },
      res,
    }) => {
      const id = addressId

      const query = await AddressModel.query().findOne({ id })

      if (!query) {
        res.send({ result: null })
      }

      res.send({
        result: query,
      })
    },
  ],
  PATCH: [
    auth("user"),
    validate({
      query: {
        addressId: numberValidator.required(),
      },
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
    async ({
      locals: {
        query: { addressId },
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
      const id = addressId
      const addAddress = await AddressModel.query().findOne({ id })

      await AddressModel.query().updateAndFetchById(id, {
        ...(addAddress.name !== name ? { name } : {}),
        ...(addAddress.lastName !== lastName ? { lastName } : {}),
        ...(addAddress.addressName !== addressName ? { addressName } : {}),
        ...(addAddress.address !== address ? { address } : {}),
        ...(addAddress.complete !== complete ? { complete } : {}),
        ...(addAddress.city !== city ? { city } : {}),
        ...(addAddress.postal_code !== postal_code ? { postal_code } : {}),
      })

      res.send({ result: true })
    },
  ],
  DELETE: [
    auth("user"),
    validate({
      query: {
        addressId: numberValidator.required(),
      },
    }),
    async ({
      locals: {
        query: { addressId },
      },
      res,
    }) => {
      const id = addressId

      await AddressModel.query().deleteById(id)

      res.send({ result: true })
    },
  ],
})

export default handler
