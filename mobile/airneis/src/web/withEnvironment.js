const { config } = require("dotenv")

config()

const withEnvironment = (config) => {
  config.extra = {
    ...config.extra,
    apiBaseUrl: process.env.API_BASE_URL,
    eas: {
      projectId: process.env.EAS_PROJECT_ID,
    },
  }

  return config
}

module.exports = withEnvironment
