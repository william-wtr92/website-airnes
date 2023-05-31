import routes from "@/web/routes"

const productData =
  ({ api }) =>
  async (productId) => {
    try {
      const { data } = await api.get(
        routes.api.admin.products.productData(productId)
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [error]
    }
  }

export default productData
