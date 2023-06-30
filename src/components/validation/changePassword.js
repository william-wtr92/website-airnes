import * as yup from "yup"

export const changepwdValidationSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .matches(
      /^(?=.*[\p{Ll}])(?=.*[\p{Lu}])(?=.*[0-9])(?=.*[^0-9\p{Lu}\p{Ll}]).*$/gu,
      "Password must contain at least 1 upper & 1 lower case letters, 1 digit, 1 spe. character"
    )
    .required("Password is required"),
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
})

export const changepwdInitialValues = {
  oldPassword: "",
  password: "",
  passwordConfirmation: "",
}
