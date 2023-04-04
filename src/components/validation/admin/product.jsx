import * as yup from "yup"

export const productValidationSchema = yup.object().shape({
  image: yup.string().required("Image link required").label("image"),
  name: yup.string().required("Name required").label("name"),
  price: yup.number().required("Price required").label("price"),
  promotion: yup.number().label("promotion"),
  category: yup.number().required("Category required").label("category"),
  material: yup
    .number()
    .required("At least 1 material required")
    .label("material"),
  quantity: yup.number().required("Quantity required").label("quantity"),
  description: yup
    .string()
    .required("Description required")
    .label("description"),
})

export const productInitialValues = {
  image: "",
  name: "",
  description: "",
  price: "",
  promotion: "",
  category: "",
  material: "",
  quantity: "",
}

export const selectedProductValidationSchema = yup.object().shape({
  product: yup.string().required("Product required").label("Product"),
})
export const selectedProductInitialValues = {
  product: "",
}
