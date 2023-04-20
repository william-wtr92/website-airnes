import routes from "@/web/routes"

const deleteProduct =
  ({ api }) =>
  async (productId) => {
    try {
      const { data } = await api.delete(routes.api.admin.products.deleteProduct(productId))

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default deleteProduct
