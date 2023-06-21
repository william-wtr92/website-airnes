import routes from "@/web/routes"

const addSelectedMaterial =
    ({ api }) =>
        async ({ materialId }) => {
            try {
                const { data } = await api.post(
                    routes.api.admin.selectMaterial.addSelectedMaterial(),
                    {
                        materialId,
                    }
                )

                return [null, data]
            } catch (err) {
                const error = err.response?.data?.error || "Oops. Something went wrong"

                return [Array.isArray(error) ? error : [error]]
            }
        }

export default addSelectedMaterial
