import routes from "@/web/routes"

const patchUser =
  ({ api, jwt }) =>
  async ({ name, mail }) => {
    try {
      const { data } = await api.patch(routes.api.user.patchUser(), {
        name,
        mail,
        jwt,
      })

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default patchUser
