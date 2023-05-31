import routes from "../routes"
import parseSession from "@/web/parseSession"
import config from "@/web/config"

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
      localStorage.setItem(config.session.localStorageKey, jwt)

        return [null, true]
      } catch (err) {
        const error = err.response?.data?.error || "Oops. Something went wrong"

        return [Array.isArray(error) ? error : [error]]
      }
    }

export default signIn
