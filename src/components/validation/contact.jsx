import * as yup from "yup"

export const contactValidationSchema = yup.object().shape({
  mail: yup.string().email().required("Email required").label("email"),
  sujet: yup.string().required("Sujet required").label("sujet"),
  textarea: yup.string().required("Message required").label("message"),
})

export const contactInitialValues = {
  mail: "",
  sujet: "",
  textarea: "",
}
