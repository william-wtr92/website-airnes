import Return from "@/components/app/ui/Return"
import { Form, Formik } from "formik"
import FormField from "@/components/utils/FormField"
import Button from "@/components/app/ui/Button"

const CarouselForm = (props) => {
  const { initialValues, validationSchema, onSubmit } = props

  return (
    <div className="p-10 flex flex-col gap-10 absolute top-10 left-0 z-0 lg:top-0 lg:left-64">
      <Return name="carousel" back={"/admin/homepage"} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="flex flex-col gap-5">
          <FormField
            type="text"
            name="label"
            placeholder="Enter the label of ur image"
            label="Label"
            className="w-96"
          />
          <FormField
            type="text"
            name="url"
            placeholder="Enter the url of ur image"
            label="Url"
          />
          <Button type="submit" className="mt-10 bg-white">
            Save
          </Button>
        </Form>
      </Formik>
    </div>
  )
}

export default CarouselForm
