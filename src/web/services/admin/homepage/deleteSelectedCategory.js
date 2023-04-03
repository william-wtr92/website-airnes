import routes from "@/web/routes"

const deleteSelectedCategory =
  ({ api }) =>
  async (categoryId) => {
    try {
      const { data } = await api.delete(
        routes.api.selectCategory.deleteSelectCategory(categoryId)
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default deleteSelectedCategory
