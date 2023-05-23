import jsonwebtoken from "jsonwebtoken"
import config from "@/api/config.js"
import { InvalidAccessError, InvalidCredentialsError } from "@/api/errors"

const auth = (requiredRole) => async (ctx) => {
  const { req, next } = ctx

  const jwt = req.headers.authorization

  if (!jwt) {
    throw new InvalidCredentialsError()
  }

  try {
    const { payload } = jsonwebtoken.verify(
      jwt.slice(8),
      config.security.jwt.secret
    )

    const userRole = payload.user.role

    if (requiredRole === "user") {
      const userRoleId = parseInt(payload.user.id, 10)
      const paramsId = parseInt(req.query.userId, 10)

      if (userRoleId !== paramsId && userRole !== "admin") {
        throw new InvalidAccessError()
      }
    }

    if (requiredRole === "admin") {
      const hasPerms = requiredRole === userRole

      if (!hasPerms) {
        throw new InvalidAccessError()
      }
    }

    next()
  } catch (err) {
    if (err instanceof jsonwebtoken.JsonWebTokenError) {
      throw new InvalidCredentialsError()
    }

    throw err
  }
}

export default auth
