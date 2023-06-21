import routes from "@/web/routes"

const getSelectMaterial =
  ({ api }) =>
  async () => {
    try {
      const { data } = await api.get(
        `${routes.api.admin.selectMaterial.getSelectMaterial()}`
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [error]
    }
  }

export default getSelectMaterial
