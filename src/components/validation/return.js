import * as yup from "yup"

import {
  boolValidator,
  stringValidator,
} from "@/components/validation/validation"

export const returnValidationSchema = yup.object().shape({
  products: yup.array().of(
    yup.object().shape({
      selected: boolValidator,
      reason: stringValidator
    })
  )
})