import routes from "../routes"

const addAdress =
  ({ api, jwt }) =>
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
      const { data } = await api.post(routes.api.addAdress(), {
        name,
        lastName,
        addressName,
        address,
        complete,
        city,
        postal_code,
        jwt,
      })

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default addAdress