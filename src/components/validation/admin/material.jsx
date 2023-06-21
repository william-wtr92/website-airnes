import * as yup from "yup"

export const materialValidationSchema = yup.object().shape({
    name: yup.string().required("Name required").label("name"),
    description: yup
        .string()
        .required("Description required")
        .label("description"),
})

export const materialInitialValues = {
    name: "",
    description: "",
}

export const selectedMaterialValidationSchema = yup.object().shape({
    material: yup.string().required("Category required").label("Category"),
})
export const selectedMaterialInitialValues = {
    material: "",
}
