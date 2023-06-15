import routes from "@/web/routes"

const orderData =
  ({ api }) =>
  async (userId, orderId) => {
    try {
      const { data } = await api.get(
        `${routes.api.user.order.orderData(userId, orderId)}`
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [error]
    }
  }

export default orderData
