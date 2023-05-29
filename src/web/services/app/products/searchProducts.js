import routes from "@/web/routes"

const searchProducts =
  ({ api }) =>
  async (page, search) => {
    try {
      const { data } = await api.get(
        routes.api.app.products.searchProducts() +
          `?page=${page}&search=${search}`
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [error]
    }
  }

export default searchProducts
