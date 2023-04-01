import * as yup from "yup"

export const categoryValidationSchema = yup.object().shape({
  image: yup.string().required("Image link required").label("image"),
  name: yup.string().required("Name required").label("name"),
  description: yup
    .string()
    .required("Description required")
    .label("description"),
})

export const categoryInitialValues = {
  image: "",
  name: "",
  description: "",
}
