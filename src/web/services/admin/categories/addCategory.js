import routes from "@/web/routes"

const addCategory =
  ({ api }) =>
  async ({ image, name, description }) => {
    try {
      const { data } = await api.post(
        routes.api.admin.categories.createCategory(),
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

export default addCategory
