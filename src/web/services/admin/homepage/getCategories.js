import routes from "@/web/routes"

const getCategories =
  ({ api }) =>
  async () => {
    try {
      const { data } = await api.get(routes.api.admin.carousel.getCategories())

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [error]
    }
  }

export default getCategories
