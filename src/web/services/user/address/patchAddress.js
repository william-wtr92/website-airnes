import routes from "@/web/routes"

const patchAddress =
  ({ api }) =>
  async (
    { name, lastName, addressName, address, complete, city, postal_code },
    userId,
    addressId
  ) => {
    try {
      const { data } = await api.patch(
        routes.api.user.address.patchAddress(userId, addressId),
        {
          name,
          lastName,
          addressName,
          address,
          complete,
          city,
          postal_code,
        }
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default patchAddress
