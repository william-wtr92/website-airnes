import routes from "@/web/routes"

const getProduct =
  ({ api }) =>
  async (productId, withSimilarProducts) => {
    try {
      const { data } = await api.get(
        routes.api.app.products.getProduct(productId) +
          `?withSimilarProducts=${withSimilarProducts}`
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [error]
    }
  }

export default getProduct
