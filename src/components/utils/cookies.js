import { serialize } from "cookie"

export const setCookie = (res, name, value, options = {}) => {
  const stringValue =
    typeof value === "object" ? "j:" + JSON.stringify(value) : String(value)

  if (typeof options.maxAge === "number") {
    options.expires = new Date(Date.now() + options.maxAge * 1000)
  }

  res.setHeader("Set-Cookie", serialize(name, stringValue, options))
}
