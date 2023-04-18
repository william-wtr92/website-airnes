const { config } = require("dotenv")
const { resolve } = require("path")

config()

const knexfile = {
  client: "pg",
  connection: {
    port: process.env.DB_CONNECTION_PORT,
    user: process.env.DB_CONNECTION_USER,
    password: process.env.DB_CONNECTION_PWD,
    database: process.env.DB_CONNECTION_DB,
  },
  migrations: {
    directory: resolve("src/api/db/migrations"),
    stub: resolve("src/api/db/migration.stub"),
  },
  seeds: {
    directory: resolve("src/api/seeds"),
  },
}

module.exports = knexfile
