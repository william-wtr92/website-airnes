import routes from "@/web/routes"

const addSelectedProduct =
  ({ api }) =>
  async ({ productId }) => {
    try {
      const { data } = await api.post(
        routes.api.admin.selectProduct.addSelectedProduct(),
        {
          productId,
        }
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default addSelectedProduct
