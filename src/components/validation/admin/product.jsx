import * as yup from "yup"

export const productValidationSchema = yup.object().shape({
  image: yup.array().of(
      yup.object().shape({
        url: yup.string().required().label("image")
      })
  ).min(1, "At least 1 image required").required("Image list required"),
  name: yup.string().required("Name required").label("name"),
  price: yup.number().required("Price required").positive().label("price"),
  promotion: yup.number().label("promotion").when("price", (price, schema) => {
    return (price !== null && price !== undefined) ? schema.max(price, "Promotion can't be higher than price") : schema.min(0)
  }).notRequired(),
  category: yup.number().required("Category required").label("category"),
  material: yup.number().required("At least 1 material required").label("material"),
  quantity: yup.number().required("Quantity required").label("quantity"),
  description: yup.string().required("Description required").label("description"),
  priority: yup.boolean().notRequired().label("priority")
})


export const productInitialValues = {
  image: "",
  name: "",
  description: "",
  price: "",
  promotion: 0,
  category: "",
  material: "",
  quantity: "",
  priority: false
}

export const editProductValidationSchema = yup.object().shape({
  image: yup.array().of(
      yup.object().shape({
        url: yup.string().required().label("image")
      })
  ).min(1, "At least 1 image required").required("Image list required"),
  name: yup.string().required("Name required").label("name"),
  price: yup.number().required("Price required").label("price"),
  promotion: yup.number().label("promotion").when("price", (price, schema) => {
    return (price !== null && price !== undefined) ? schema.max(price, "Promotion can't be higher than price") : schema.min(0)
  }).notRequired(),
  categoryId: yup.number().required("Category required").label("category"),
  materialId: yup
    .number()
    .required("At least 1 material required")
    .label("material"),
  quantity: yup.number().required("Quantity required").label("quantity"),
  description: yup
    .string()
    .required("Description required")
    .label("description"),
  priority: yup.boolean().notRequired().label("priority")
})

export const selectedProductValidationSchema = yup.object().shape({
  products: yup.string().required("Product required").label("Product"),
})
export const selectedProductInitialValues = {
  products: "",
}
