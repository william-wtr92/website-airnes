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
