import routes from "@/web/routes"

const updateMaterial =
  ({ api }) =>
  async ({ materialId, name, description }) => {
    try {
      const { data } = await api.patch(
        routes.api.admin.materials.updateMaterial(materialId),
        {
          name,
          description,
        }
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default updateMaterial
