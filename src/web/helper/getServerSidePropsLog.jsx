import { getSessionFromContext } from "../session"

export const redirectToHomeIfLoggedIn = async (context) => {
  const session = getSessionFromContext(context)

  if (
    session &&
    (context.req.url === "/signup" || context.req.url === "/user/login")
  ) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
