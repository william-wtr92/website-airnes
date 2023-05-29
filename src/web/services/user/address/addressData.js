import routes from "@/web/routes"

const addressData =
  ({ api }) =>
  async (userId, addressId) => {
    try {
      const { data } = await api.get(
        routes.api.user.address.addressData(userId, addressId)
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [error]
    }
  }

export default addressData
