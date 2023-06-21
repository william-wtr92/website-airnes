import Return from "@/components/app/ui/Return"
import { Form, Formik } from "formik"
import FormField from "@/components/utils/FormField"
import Button from "@/components/app/ui/Button"

const MaterialForm = (props) => {
    const { initialValues, validationSchema, onSubmit } = props

    return (
        <div className="p-10 flex flex-col gap-10 absolute top-10 left-0 z-0 lg:top-0 lg:left-64">
            <Return name="materials" back={"/admin/materials/all"} />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form className="flex flex-col gap-5">
                    <FormField
                        type="text"
                        name="name"
                        placeholder="Enter the material's name"
                        label="Name"
                    />
                    <FormField
                        type="text"
                        tag="textarea"
                        name="description"
                        placeholder="Enter the material's description"
                        label="Description"
                    />
                    <Button type="submit" className="mt-10">
                        Save
                    </Button>
                </Form>
            </Formik>
        </div>
    )
}

export default MaterialForm
