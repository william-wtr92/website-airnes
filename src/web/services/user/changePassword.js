import routes from "@/web/routes"

const changePassword =
  ({ api }) =>
  async ({ userId, password }) => {
    try {
      const { data } = await api.patch(
        routes.api.user.changePasswordUser(userId),
        {
          password,
        }
      )

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [error]
    }
  }

export default changePassword
