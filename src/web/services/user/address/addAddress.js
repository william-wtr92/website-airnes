import routes from "../../../routes"

const addAddress =
  ({ api }) =>
  async ({
    name,
    lastName,
    addressName,
    address,
    complete,
    city,
    postal_code,
  }) => {
    try {
      const { data } = await api.post(routes.api.user.addAddress(), {
        name,
        lastName,
        addressName,
        address,
        complete,
        city,
        postal_code,
      })

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default addAddress
