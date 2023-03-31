import { useCallback } from "react"
import { Formik, Form } from "formik"
import * as yup from "yup"
import useAppContext from "@/web/hooks/useAppContext"
import Button from "@/components/app/ui/Button"
import FormField from "@/components/utils/FormField"

const FileUpload = () => {
  const { actions } = useAppContext()

  const validationSchema = yup.object({
    file: yup
      .mixed()
      .required("Veuillez sélectionner un fichier à télécharger."),
  })

  const handleFileChange = (event, setFieldValue) => {
    setFieldValue("file", event.target.files[0])
  }

  const handleSubmit = useCallback(
    async (values, { setSubmitting, setErrors }) => {
      const [error] = await actions.uploadFile(values.file)

      if (error) {
        setErrors({
          file: `Erreur lors du téléchargement du fichier : ${error}`,
        })
      } else {
        alert("Le fichier a été téléchargé avec succès.")
      }

      setSubmitting(false)
    },
    [actions]
  )

  return (
    <Formik
      initialValues={{ file: null }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <Form>
          <div className="flex flex-col gap-12 p-4 border-primary border-2 rounded-md">
            <FormField
              name="file"
              type="file"
              onChange={(event) => handleFileChange(event, setFieldValue)}
              divClassName="w-50 text-sm border-none"
            />
            <Button
              className="flex items-center justify-center w-50 h-10 text-sm"
              type="submit"
            >
              Télécharger le fichier
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default FileUpload
