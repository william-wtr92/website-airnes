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
  name: yup.string().required("Name required").label("name"),
  email: yup.string().email().required("Email required").label("email"),
  password: yup
    .string()
    .matches(
      /^(?=.*[\p{Ll}])(?=.*[\p{Lu}])(?=.*[0-9])(?=.*[^0-9\p{Lu}\p{Ll}]).*$/gu,
      "Password must contain at least 1 upper & 1 lower case letters, 1 digit, 1 spe. character"
    )
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mot de passe différent"),
  cgu: yup.bool().oneOf([true], "Les CGU sont obligatoires"),
})

export const inscriptionInitialValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  cgu: false,
}

export const loginValidationSchema = yup.object().shape({
  mail: yup.string().required().label("mail"),
  pwd: yup.string().required().label("pwd"),
})

export const loginInitialValues = {
  mail: "",
  pwd: "",
}

export const accountSettingsValidationSchema = yup.object().shape({
  name: yup.string().required("Name required"),
  mail: yup.string().email().required("Email required"),
})

export const accountSettingsInitialValues = {
  name: "",
  mail: "",
}
