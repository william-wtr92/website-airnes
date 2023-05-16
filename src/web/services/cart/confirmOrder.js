import routes from "@/web/routes"

const confirmOrder =
  ({ api }) =>
  async (payment_intent, redirect_status, cartItems) => {
    try {
      const { data } = await api.post(routes.api.cart.confirmOrder(), {
        payment_intent,
        redirect_status,
        cartItems,
      })

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default confirmOrder
