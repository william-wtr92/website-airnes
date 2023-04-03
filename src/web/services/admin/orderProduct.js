import routes from "@/web/routes"

const orderProduct =
  ({ api, jwt }) =>
  async (productId, direction) => {
    try {
      const { data } = await api.patch(
        `${routes.api.changeProductOrder(productId)}`,
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

export default orderProduct
