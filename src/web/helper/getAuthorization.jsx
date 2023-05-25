import {getSessionFromCookiesServ} from "@/web/helper/getSessionFromCookiesServ"

const redirect = (path) => {
  return {
    redirect: {
      destination: path,
    }
  }
}

export const getAuthorization = (restrictedTo, req, params) => {
  const session = getSessionFromCookiesServ(req)

  if (restrictedTo) {
    if (session === null) {
      return redirect("/user/login")
    }

    const {
      user: { id, role },
    } = session

    if (params) {
      const askedUser = parseInt(params.userId, 10)

      if (askedUser !== id && role !== "admin") {
        return redirect("/")
      }
    }

    if (restrictedTo !== "user" && role !== "admin") {
      return redirect("/")
    }
  }
}