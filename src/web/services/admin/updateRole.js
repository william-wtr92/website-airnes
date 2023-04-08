import routes from "@/web/routes"

const patchRole =
  ({ api }) =>
  async ({ userId, roleid }) => {
    try {
      const { data } = await api.patch(routes.api.patchRole(userId), {
        roleid,
      })

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default patchRole
