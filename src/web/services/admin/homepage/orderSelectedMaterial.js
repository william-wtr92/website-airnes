import routes from "@/web/routes"

const orderSelectedMaterial =
  ({ api }) =>
    async (materialId, direction) => {
      try {
        const { data } = await api.patch(
          `${routes.api.admin.selectMaterial.orderSelectedMaterial(materialId)}`,
          {
            direction
          }
        )

        return [null, data]
      } catch (err) {
        const error = err.response?.data?.error || "Oops. Something went wrong"

        return [Array.isArray(error) ? error : [error]]
      }
    }

export default orderSelectedMaterial
