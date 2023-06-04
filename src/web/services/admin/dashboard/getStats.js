import routes from "@/web/routes"

const getStats =
  ({ api }) =>
  async () => {
    try {
      const { data } = await api.get(routes.api.dashboard.getStats())

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [error]
    }
  }

export default getStats
