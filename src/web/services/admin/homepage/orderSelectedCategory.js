import routes from "@/web/routes"

const orderSelectedCategory =
  ({ api, jwt }) =>
  async (categoryId, direction) => {
    try {
      const { data } = await api.patch(
        `${routes.api.selectCategory.orderSelectedCategory(categoryId)}`,
        {
          direction,
          jwt,
        }
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default orderSelectedCategory
