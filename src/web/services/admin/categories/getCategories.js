import routes from "@/web/routes"

const getCategories =
  ({ api }) =>
  async (page, order, col) => {
    try {
      const { data } = await api.get(
        routes.api.admin.categories.getCategories() +
          `?page=${page}&order=${order}&col=${col}`
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [error]
    }
  }

export default getCategories
