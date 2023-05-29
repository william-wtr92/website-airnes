import routes from "@/web/routes"

const getSelectProducts =
  ({ api }) =>
  async () => {
    try {
      const { data } = await api.get(
        `${routes.api.admin.selectProduct.getSelectProducts()}`
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [error]
    }
  }

export default getSelectProducts
