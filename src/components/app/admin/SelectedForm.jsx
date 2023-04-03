import Return from "@/components/app/ui/Return"
import { Field, Form, Formik } from "formik"
import Button from "@/components/app/ui/Button"

const SelectedForm = (props) => {
  const { initialValues, validationSchema, onSubmit, selectOptions } = props

  return (
    <div className="p-10 flex flex-col gap-10 absolute top-10 left-0 z-0 lg:top-0 lg:left-64">
      <Return name="homepage" back={"/admin/homepage"} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="flex flex-col gap-5">
          <Field
            as="select"
            name="category"
            className="flex border-2 rounded-md border-gray-400 py-1 cursor-pointer"
          >
            <option defaultChecked>Ajouter une catégorie</option>
            {selectOptions.map((option) => (
              <option value={option.value} id={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </Field>
          <Button type="submit" className="mt-10 bg-white">
            Add
          </Button>
        </Form>
      </Formik>
    </div>
  )
}

export default SelectedForm
