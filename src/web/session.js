import parseSession from "@/web/parseSession"

export const getSessionFromContext = (context) => {
  const jwt = context.req.cookies.session

  if (jwt) {
    const session = parseSession(jwt)

    return session
  }

  return null
}
