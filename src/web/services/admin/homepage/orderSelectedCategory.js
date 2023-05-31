import routes from "@/web/routes"

const orderSelectedCategory =
  ({ api }) =>
    async (categoryId, direction) => {
      try {
        const { data } = await api.patch(
          `${routes.api.admin.selectCategory.orderSelectedCategory(categoryId)}`,
          {
            direction
          }
        )

        return [null, data]
      } catch (err) {
        const error = err.response?.data?.error || "Oops. Something went wrong"

        return [Array.isArray(error) ? error : [error]]
      }
    }

export default orderSelectedCategory
