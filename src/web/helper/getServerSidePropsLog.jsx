import {getSessionFromContext} from "../session"

export const redirectToHomeIfLoggedIn = async (context) => {
  const session = await getSessionFromContext(context)

  const isSignUp = context.req.url === "/signup"
  const isLogin = context.req.url === "/user/login"

  if (session && (isSignUp || isLogin)) {
    const { locale } = context

    const destination = locale ? `/${locale}` : "/"

    return {
      redirect: {
        destination: destination,
        permanent: false
      }
    }
  }

  return null
}
