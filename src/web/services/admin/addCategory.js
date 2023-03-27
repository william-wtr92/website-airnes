import routes from "@/web/routes"

const addCategory =
  ({api, jwt}) =>
    async ({
             image,
             name,
             description,
           }) => {
      try {
        const {data} = await api.post(routes.api.createCategory(), {
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

export default addCategory