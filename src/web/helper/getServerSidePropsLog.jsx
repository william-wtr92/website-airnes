import { getSessionFromContext } from "../session"

export const redirectToHomeIfLoggedIn = async (context) => {
  const session = getSessionFromContext(context)

  if (
    session &&
    (context.req.url === "/signup" || context.req.url === "/user/login")
  ) {
    const { locale } = context

    const destination = locale ? `/${locale}` : "/"

    return {
      redirect: {
        destination: destination,
        permanent: false,
      },
    }
  }

  return null
}
