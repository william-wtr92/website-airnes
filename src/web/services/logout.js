import routes from "../routes"

const logout =
  ({ api, setSession }) =>
    async () => {
      try {
        const { data } = await api.post(routes.api.logout())

        setSession(false)

        return [null, data]
      } catch (err) {
        const error = err.response?.data?.error || "Oops. Something went wrong"

        return [Array.isArray(error) ? error : [error]]
      }
    }

export default logout
