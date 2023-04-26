import Cookies from "js-cookie"
import config from "../config"
import parseSession from "../parseSession"
import routes from "../routes"

const signIn =
  ({ api, setSession, setJWT }) =>
  async ({ mail, password }) => {
    try {
      const {
        data: { result: jwt },
      } = await api.post(routes.api.signIn(), {
        mail,
        password,
      })

      setSession(parseSession(jwt))
      setJWT(jwt)

      Cookies.set(config.session.localStorageKey, jwt, { expires: 30 })

      return [null, true]
    } catch (err) {
      const error = err.response?.data?.error || "Oops. Something went wrong"

      return [Array.isArray(error) ? error : [error]]
    }
  }

export default signIn
