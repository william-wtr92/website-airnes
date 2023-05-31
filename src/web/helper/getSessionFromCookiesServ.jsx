import parseSession from "../parseSession"

export const getSessionFromCookiesServ = (req) => {
  const jwt = req.headers.cookie

  if (!jwt) {
    return null
  }

  return parseSession(jwt)
}
