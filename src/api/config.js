const { config: loadEnv } = require("dotenv")
const { resolve } = require("path")

loadEnv()

const config = {
  port: 3000,
  db: {
    client: "cockroachdb",
    connection: {
      host: process.env.DB_CONNECTION_HOST,
      port: process.env.DB_CONNECTION_PORT,
      user: process.env.DB_CONNECTION_USER,
      password: process.env.DB_CONNECTION_PWD,
      database: process.env.DB_CONNECTION_DB,
      ssl: true,
      sslmode: "verify-full",
    },
    migrations: {
      directory: resolve("src/api/db/migrations"),
      stub: resolve("src/api/db/migration.stub"),
    },
  },
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
}

module.exports = config
