import routes from "@/web/routes"

const deleteUser =
  ({ api }) =>
  async (userId) => {
    try {
      const { data } = await api.delete(routes.api.user.deleteUser(userId))

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default deleteUser
