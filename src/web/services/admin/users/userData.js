import routes from "@/web/routes"

const UserData =
  ({ api }) =>
  async (userId) => {
    try {
      const { data } = await api.get(routes.api.admin.users.userData(userId))

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [error]
    }
  }

export default UserData
