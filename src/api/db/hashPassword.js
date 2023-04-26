const { pbkdf2: pbkdf2Callback, randomBytes } = require("crypto")
const { promisify } = require("util")
const config = require("../config.js")

const pbkdf2 = promisify(pbkdf2Callback)

const hashPassword = async (
  password,
  salt = randomBytes(config.security.password.saltlen).toString("hex")
) => [
  (
    await pbkdf2(
      `${password}${config.security.password.pepper}`,
      salt,
      config.security.password.iterations,
      config.security.password.keylen,
      config.security.password.digest
    )
  ).toString("hex"),
  salt,
]

module.exports.hashPassword = hashPassword
