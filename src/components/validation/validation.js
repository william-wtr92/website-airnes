import * as yup from "yup"

// pagination
export const queryPageValidator = yup
  .number()
  .integer()
  .default(0)
  .label("Page")

// generic
export const boolValidator = yup.bool()
export const stringValidator = yup.string()
export const linkValidator = yup.string().url()
export const numberValidator = yup.number()

// users
export const NameValidator = yup.string().min(1).label("name")

export const mailValidator = yup.string().email().label("mail")

export const passwordValidator = yup
  .string()
  .min(8)
  .matches(
    /^(?=.*[\p{Ll}])(?=.*[\p{Lu}])(?=.*[0-9])(?=.*[^0-9\p{Lu}\p{Ll}]).*$/gu,
    "Password must contain at least 1 upper & 1 lower case letters, 1 digit, 1 spe. character"
  )

// carousel

export const urlValidator = yup
  .string()
  .url("Must be a valid URL")
  .required("URL is required")

export const labelValidator = yup.string()
