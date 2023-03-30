import * as yup from "yup"

export const fileNameValidator = yup
  .string()
  .required("Le nom de fichier est requis")
  .matches(
    /^[a-zA-Z0-9_-]+(.(png|jpg|gif|jpeg))$/,
    "Le nom de fichier doit contenir uniquement des caractères alphanumériques, des tirets, des underscores et une extension valide (png, jpg, gif, jpeg)."
  )
  .max(255, "Le nom de fichier ne doit pas dépasser 255 caractères")
