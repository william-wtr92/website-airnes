import routes from "@/web/routes"

const deleteSelectedMaterial =
    ({ api }) =>
        async (categoryId) => {
            try {
                const { data } = await api.delete(
                    routes.api.admin.selectMaterial.deleteSelectMaterial(categoryId)
                )

                return [null, data]
            } catch (err) {
                const error = err.response?.data?.error || "Oops. Something went wrong"

                return [Array.isArray(error) ? error : [error]]
            }
        }

export default deleteSelectedMaterial
