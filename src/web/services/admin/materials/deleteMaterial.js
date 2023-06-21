import routes from "@/web/routes"

const deleteMaterial =
  ({ api }) =>
  async (materialId) => {
    try {
      const { data } = await api.delete(
        routes.api.admin.materials.deleteMaterial(materialId)
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default deleteMaterial
