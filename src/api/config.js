const dotenv = require("dotenv")
const { resolve } = require("path")

dotenv.config({ path: resolve(".env") })

const isProduction = process.env.NODE_ENV === "production"
const vercelUrl = process.env.VERCEL_URL

const config = {
  port: 3000,
  db: {
    client: "pg",
    connection: {
      host: process.env.DB_CONNECTION_HOST,
      user: process.env.DB_CONNECTION_USER,
      password: process.env.DB_CONNECTION_PWD,
      database: process.env.DB_CONNECTION_DB,
      // ssl: true,
      // sslmode: "require",
    },
    migrations: {
      directory: resolve("src/api/db/migrations"),
      stub: resolve("src/api/db/migration.stub"),
    },
    seeds: {
      directory: resolve("src/api/seeds"),
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
  path: isProduction ? `https://${vercelUrl}/` : process.env.HOST_PATH,
  baseURL: `${
    isProduction ? `https://${vercelUrl}/` : process.env.HOST_PATH
  }/api`,
}

module.exports = config
