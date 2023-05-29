import routes from "@/web/routes"

const getFilterServices =
    ({ api }) =>
        async () => {
            try {
                const { data } = await api.get(
                    routes.api.app.products.getFilter()
                )

                return [null, data]
            } catch (err) {
                const error = err.response?.data?.error || "Oops. Something went wrong"

                return [error]
            }
        }

export default getFilterServices
