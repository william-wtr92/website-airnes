import * as yup from "yup"

// generic
export const boolValidator = yup.bool()

// users
export const NameValidator = yup.string().min(1).label("name")

export const emailValidator = yup.string().email().label("email")

export const passwordValidator = yup
  .string()
  .min(8)
  .matches(
    /^(?=.*[\p{Ll}])(?=.*[\p{Lu}])(?=.*[0-9])(?=.*[^0-9\p{Lu}\p{Ll}]).*$/gu,
    "Password must contain at least 1 upper & 1 lower case letters, 1 digit, 1 spe. character"
  )