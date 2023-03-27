import routes from "@/web/routes"

const patchUser =
  ({ api, jwt }) =>
  async ({ name, email }) => {
    try {
      const { data } = await api.post(routes.api.user.patchUser(), {
        name,
        email,
        jwt,
      })

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default patchUser
