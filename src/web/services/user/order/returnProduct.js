import routes from "@/web/routes"

const returnProduct =
  ({ api }) =>
    async ({ orderId, product_id, reason, userId }) => {
      try {
        const { data } = await api.patch(
          routes.api.user.order.returnProduct(userId, orderId),
          {
            orderId,
            productId: product_id,
            reason,
          }
        )

        return [null, data]
      } catch (err) {
        const error = err.response?.data?.error || "Oops. Something went wrong"

        return [error]
      }
    }

export default returnProduct
