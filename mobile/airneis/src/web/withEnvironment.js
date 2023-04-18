const { config } = require("dotenv")

config()

const withEnvironment = (config) => {
  config.extra = {
    apiBaseUrl: process.env.API_BASE_URL,
  }

  return config
}

module.exports = withEnvironment
