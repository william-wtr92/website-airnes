import parseSession from "./parseSession"
import config from "./config"

export const getSessionFromContext = (context) => {
  const jwt = context.req.cookies[config.session.localStorageKey]

  const session = jwt ? parseSession(jwt) : null

  return session
}
