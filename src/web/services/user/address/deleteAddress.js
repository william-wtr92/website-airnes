import routes from "@/web/routes"

const deleteAddress =
  ({ api }) =>
  async (userId, addressId) => {
    try {
      const { data } = await api.delete(
        routes.api.user.address.deleteAddress(userId, addressId)
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default deleteAddress
