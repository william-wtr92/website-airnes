import routes from "@/web/routes"

const patchRole =
  ({ api }) =>
  async ({ userId, roleid, values }) => {
    try {
      const { data } = await api.patch(
        routes.api.admin.users.patchRole(userId),
        {
          roleid,
          name: values.name,
          mail: values.mail,
        }
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default patchRole
