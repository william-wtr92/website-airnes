import Cookies from "js-cookie"
import config from "../config"
import parseSession from "../parseSession"

export const getSessionFromCookies = () => {
  const jwt = Cookies.get(config.session.localStorageKey)

  if (!jwt) {
    return null
  }

  return parseSession(jwt)
}
