import routes from "@/web/routes"

const resetPwd =
  ({ api }) =>
  async ({ tokken, password }) => {
    try {
      const { data } = await api.patch(routes.api.resetPwd(), {
        tokken,
        password,
      })

      return [null, data]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default resetPwd
