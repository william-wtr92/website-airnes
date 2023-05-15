import routes from "@/web/routes"

const payment =
  ({ api }) =>
  async (items) => {
    try {
      const { data } = await api.post(routes.api.cart.payment(), {
        items,
      })

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default payment
