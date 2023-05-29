import routes from "../routes"
import config from "@/web/config"

const logout =
  ({ api, setSession, setJWT }) =>
    async () => {
      try {
        const { data } = await api.post(routes.api.logout())

        setSession(null)
        setJWT(null)
        localStorage.removeItem(config.session.localStorageKey)

        return [null, data]
      } catch (err) {
        const error = err.response?.data?.error || "Oops. Something went wrong"

        return [Array.isArray(error) ? error : [error]]
      }
    }

export default logout
