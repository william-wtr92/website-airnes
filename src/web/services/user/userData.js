import routes from "@/web/routes"

const userData =
  ({ api }) =>
  async (userId) => {
    try {
      const { data } = await api.get(routes.api.user.userData(userId))

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [error]
    }
  }

export default userData
