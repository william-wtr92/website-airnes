import routes from "@/web/routes"

const updateCategory =
  ({api, jwt}) =>
    async ({
             categoryId,
             image,
             name,
             description,
           }) => {
      try {
        const {data} = await api.patch(routes.api.updateCategory(categoryId), {
          image,
          name,
          description,
          jwt,
        })

        return [null, data]
      } catch (err) {
        const error = err.response?.data?.error || "Oops. Something went wrong"

        return [Array.isArray(error) ? error : [error]]
      }
    }

export default updateCategory