import config from "../config"
import parseSession from "../parseSession"
import routes from "../routes"

const signIn =
  ({ api, setSession, setJWT }) =>
  async ({ email, password }) => {
    try {
      const {
        data: { result: jwt },
      } = await api.post(routes.api.signIn(), {
        email,
        password,
      })

      setSession(parseSession(jwt))
      setJWT(jwt)
      localStorage.setItem(config.session.localStorageKey, jwt)

      return [null, true]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default signIn
