import routes from "@/web/routes"

const cancelOrder =
  ({ api }) =>
  async (userId, orderId) => {
    try {
      const { data } = await api.patch(
        `${routes.api.user.order.cancelOrder(userId, orderId)}`
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [error]
    }
  }

export default cancelOrder
