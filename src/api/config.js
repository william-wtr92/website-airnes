const knexfile = require("../../knexfile.js")
const dotenv = require("dotenv")
const { resolve } = require("path")

dotenv.config({ path: resolve(".env.local") })

const config = {
  port: 3000,
  db: knexfile,
  security: {
    jwt: {
      secret: process.env.SECURITY_JWT_SECRET,
      expiresIn: "1 day",
    },
    password: {
      saltlen: 512,
      keylen: 512,
      iterations: 10000,
      digest: "sha512",
      pepper: process.env.SECURITY_PASSWORD_PEPPER,
    },
  },
  pagination: {
    limit: {
      min: 1,
      max: 100,
      default: 6,
    },
    offset: {
      min: 0,
      max: 100,
      default: 0,
    },
  },
}

module.exports = config
