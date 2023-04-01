import * as yup from "yup"

export const carouselInitialValues = {
  label: "",
  url: "",
}

export const carouselValidationSchema = yup.object({
  label: yup.string().required("Label required"),
  url: yup
    .string()
    .url("Enter a valid url")
    .required("Url required")
    .label("url"),
})
