import routes from "@/web/routes"

const getMaterialsAndCategory =
  ({ api }) =>
  async () => {
    try {
      const { data } = await api.get(
        routes.api.admin.materials.getMaterialsAndCategory()
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [error]
    }
  }

export default getMaterialsAndCategory
