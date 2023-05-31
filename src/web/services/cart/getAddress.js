import routes from "@/web/routes"

const getAddress =
  ({ api }) =>
  async (userId) => {
    try {
      const { data } = await api.get(`${routes.api.cart.getaddress(userId)}`)

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [error]
    }
  }

export default getAddress
