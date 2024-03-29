import routes from "@/web/routes"

const addMaterial =
    ({ api }) =>
        async ({ name, description }) => {
            try {
                const { data } = await api.post(
                    routes.api.admin.materials.createMaterial(),
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

export default addMaterial
