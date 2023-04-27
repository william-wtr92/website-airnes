const { resolve } = require("path")

module.exports = {
  i18n: {
    defaultLocale: "fr",
    locales: ["en", "fr", "am", "hbr"],
  },
  localePath: resolve("./public/locales"),
}
