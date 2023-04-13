import routes from "@/web/routes"

const patchUser =
  ({ api }) =>
  async ({ name, mail }, userId) => {
    try {
      const { data } = await api.patch(routes.api.user.patchUser(userId), {
        name,
        mail,
      })

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default patchUser
