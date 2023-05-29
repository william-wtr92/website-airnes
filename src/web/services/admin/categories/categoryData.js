import routes from "@/web/routes"

const categoryData =
  ({ api }) =>
  async (categoryId) => {
    try {
      const { data } = await api.get(
        routes.api.admin.categories.categoryData(categoryId)
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [error]
    }
  }

export default categoryData
