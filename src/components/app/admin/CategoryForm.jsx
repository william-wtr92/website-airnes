import Return from "@/components/app/ui/Return"
import {Form, Formik} from "formik"
import FormField from "@/components/utils/FormField"
import Button from "@/components/app/ui/Button"

const CategoryForm = (props) => {
    const {categoryInitialValues, categoryValidationSchema, handlePost} = props

    return (
        <div className="p-10 flex flex-col gap-10 absolute top-10 left-0 z-0 lg:top-0 lg:left-64">
            <Return name="categories" back={"/admin/categories/all"}/>
            <Formik
                initialValues={categoryInitialValues}
                validationSchema={categoryValidationSchema}
                onSubmit={handlePost}
            >
                <Form className="flex flex-col gap-5">
                    <FormField
                        type="text"
                        name="image"
                        placeholder="Enter the image link"
                        label="Image"
                        className="w-96"
                    />
                    <FormField
                        type="text"
                        name="name"
                        placeholder="Enter the category's name"
                        label="Name"
                    />
                    <FormField
                        type="text"
                        tag="textarea"
                        name="description"
                        placeholder="Enter the category's description"
                        label="Description"
                    />
                    <Button type="submit" className="mt-10 bg-white">Save</Button>
                </Form>
            </Formik>
        </div>
    )
}

export default CategoryForm