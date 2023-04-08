import routes from "@/web/routes"

const deleteSelectedProduct =
  ({ api }) =>
  async (productId) => {
    try {
      const { data } = await api.delete(
        routes.api.admin.selectProduct.deleteSelectProduct(productId)
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default deleteSelectedProduct
