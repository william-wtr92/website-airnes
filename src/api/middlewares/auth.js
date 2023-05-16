import jsonwebtoken from "jsonwebtoken"
import config from "@/api/config.js"
import knex from "knex"
import { InvalidAccessError, InvalidCredentialsError } from "@/api/errors"

const db = knex(config.db)

const auth = (requiredRole) => async (ctx) => {
  const { req, next } = ctx

  const jwt = req.headers.authorization

  if (!jwt) {
    throw new InvalidCredentialsError()
  }

  try {
    const { payload } = jsonwebtoken.verify(
      jwt.slice(7),
      config.security.jwt.secret
    )

    const userId = payload.user.id

    const user = await db("user").where({ id: userId }).first()
    const userRole = await db("role").where({ id: user.roleid }).first()

    const hasPerms = requiredRole === userRole.right

    if (!hasPerms) {
      throw new InvalidAccessError()
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
