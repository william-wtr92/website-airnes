import routes from "@/web/routes"

const addSelectedCategory =
  ({ api }) =>
  async ({ categoryId }) => {
    try {
      const { data } = await api.post(
        routes.api.admin.selectCategory.addSelectedCategory(),
        {
          categoryId,
        }
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default addSelectedCategory
