import * as yup from "yup"

export const addressValidationSchema = yup.object().shape({
  name: yup.string().required().label("Prénom"),
  lastName: yup.string().required().label("Nom"),
  addressName: yup.string().required().label("Nom de l'adresse"),
  address: yup.string().required().label("Adresse"),
  complete: yup.string().label("Complément d'adresse"),
  city: yup.string().required().label("Ville"),
  postal_code: yup.string().required().label("Code Postal"),
})

export const addressInitialValues = {
  name: "",
  lastName: "",
  addressName: "",
  address: "",
  complete: "",
  city: "",
  postal_code: "",
}