import routes from "@/web/routes"

const materialData =
  ({ api }) =>
  async (materialId) => {
    try {
      const { data } = await api.get(
        routes.api.admin.materials.materialData(materialId)
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [error]
    }
  }

export default materialData
