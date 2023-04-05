import routes from "@/web/routes"

const addSelectedCategory =
  ({ api, jwt }) =>
  async ({ categoryId }) => {
    try {
      const { data } = await api.post(
        routes.api.selectCategory.addSelectedCategory(),
        {
          categoryId,
          jwt,
        }
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default addSelectedCategory
