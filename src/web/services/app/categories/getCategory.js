import routes from "@/web/routes"

const getCategory =
  ({ api }) =>
  async (categoryId) => {
    try {
      const { data } = await api.get(
        routes.api.app.categories.getCategory(categoryId)
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [error]
    }
  }

export default getCategory
