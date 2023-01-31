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

export const inscriptionValidationSchema = yup.object().shape({
  name: yup.string().required("Name required"),
  mail: yup.string().email().required("Email required"),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mot de passe différent"),
})

export const inscriptionInitialValues = {
  name: "",
  mail: "",
  password: "",
  passwordConfirmation: "",
}

export const accountSettingsValidationSchema = yup.object().shape({
  name: yup.string().required("Name required"),
  mail: yup.string().email().required("Email required"),
})
