import routes from "@/web/routes"

const searchProducts =
  ({ api }) =>
  async (
    page,
    search,
    promo,
    stock,
    category,
    material,
    order,
    minPrice,
    maxPrice
  ) => {
    try {
      const { data } = await api.get(
        routes.api.app.products.searchProducts() +
          `?page=${page}&search=${search}&promo=${promo}&=stock${stock}&category=${category}&material=${material}&order=${order}&minPrice=${minPrice}&maxPrice=${maxPrice}`
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [error]
    }
  }

export default searchProducts
