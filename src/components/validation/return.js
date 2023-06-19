import * as yup from "yup"

import {
  numberValidator,
  boolValidator,
  stringValidator,
} from "@/components/validation/validation"

export const returnValidationSchema = yup.object().shape({
  products: yup.array().of(
    yup.object().shape({
      product_id: numberValidator,
      selected: boolValidator,
      reason: stringValidator
    })
  )
})