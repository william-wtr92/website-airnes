import routes from "@/web/routes"

const getOrder =
  ({ api }) =>
  async (userId) => {
    try {
      const { data } = await api.get(`${routes.api.user.getOrder(userId)}`)

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [error]
    }
  }

export default getOrder
