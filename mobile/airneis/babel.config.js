const moduleResolverConfig = {
  root: ["./"],
  alias: {
    "@": "./src",
    "@@": ".",
    "@@@": "../../src",
  },
}

module.exports = function (api) {
  api.cache(true)

  return {
    presets: ["babel-preset-expo"],
    plugins: [["module-resolver", moduleResolverConfig]],
  }
}
