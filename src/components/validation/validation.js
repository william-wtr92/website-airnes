import * as yup from "yup"
import config from "@/api/config.js"

// pagination
export const queryPageValidator = yup
  .number()
  .integer()
  .default(0)
  .label("Page")

export const queryLimitValidator = yup
  .number()
  .integer()
  .min(config.pagination.limit.min)
  .max(config.pagination.limit.max)
  .default(config.pagination.limit.default)
  .label("Query Limit")

export const queryOffsetValidator = yup
  .number()
  .integer()
  .min(config.pagination.offset.min)
  .max(config.pagination.offset.max)
  .default(config.pagination.offset.default)
  .label("Query Offset")

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
