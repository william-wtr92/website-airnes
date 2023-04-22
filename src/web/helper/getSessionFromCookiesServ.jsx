import cookie from "cookie"
import config from "../config"
import parseSession from "../parseSession"

export const getSessionFromCookiesServ = (req) => {
  if (!req || !req.headers.cookie) {
    return null
  }

  const cookies = cookie.parse(req.headers.cookie)
  const jwt = cookies[config.session.localStorageKey]

  if (!jwt) {
    return null
  }

  return parseSession(jwt)
}
