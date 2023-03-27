import routes from "@/web/routes"

const getCategories =
  ({api}) =>
    async () => {
      try {
        const {data} = await api.get(routes.api.getCategories())

        return [null, data]
      } catch (err) {
        const error = err.response?.data?.error || "Oops. Something went wrong"

        return [Array.isArray(error) ? error : [error]]
      }
    }

export default getCategories
