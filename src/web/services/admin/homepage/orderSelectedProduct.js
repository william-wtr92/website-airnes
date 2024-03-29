import routes from "@/web/routes"

const orderSelectedProduct =
  ({ api }) =>
  async (productId, direction) => {
    try {
      const { data } = await api.patch(
        `${routes.api.admin.selectProduct.orderSelectedProduct(productId)}`,
        {
          direction,
        }
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default orderSelectedProduct
