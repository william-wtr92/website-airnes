import routes from "@/web/routes"

const updateCategory =
  ({ api }) =>
  async ({ categoryId, image, name, description }) => {
    try {
      const { data } = await api.patch(
        routes.api.admin.categories.updateCategory(categoryId),
        {
          image,
          name,
          description,
        }
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default updateCategory
