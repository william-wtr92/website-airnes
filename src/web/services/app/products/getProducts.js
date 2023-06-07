import routes from "@/web/routes"

const getProducts =
  ({ api }) =>
  async (sale, page) => {
    try {
      const { data } = await api.get(routes.api.app.products.getProducts()
        + `?sale=${sale}`
        + `&page=${page}`
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [error]
    }
  }

export default getProducts
