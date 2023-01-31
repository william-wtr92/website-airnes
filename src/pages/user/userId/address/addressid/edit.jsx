import * as yup from "yup"
import { Form, Formik } from "formik"
import FormField from "@/components/utils/FormField"
import Button from "@/components/utils/Button"
import { useRouter } from "next/router"
import { useCallback } from "react"

const defaultValidationSchema = yup.object().shape({
  name: yup.string().required().label("Prénom"),
  lastname: yup.string().required().label("Nom"),
  addressname: yup.string().required().label("Nom de l'adresse"),
  address: yup.string().required().label("Adresse"),
  complete: yup.number().label("Complément d'adresse"),
  city: yup.string().required().label("Ville"),
  Postalcode: yup.number().required().label("Code Postal"),
})
const defaultInitialValues = {
  name: "",
  lastname: "",
  addressname: "",
  address: "",
  complete: "",
  city: "",
  Postalcode: "",
}

const EditAddress = (props) => {
  const {
    validationSchema = defaultValidationSchema,
    initialValues = defaultInitialValues,
  } = props

  const router = useRouter()
  const handleSelect = useCallback(() => {
    router.push("/user/userId/accountsettings")
  }, [router])

  return (
    <>
      <Formik
        onSubmit={handleSelect}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form>
          <div className="flex flex-col my-10 items-center ">
            <div className="w-4/5 lg:w-2/5">
              <h1 className="font-bold text-xl my-8 text-center">
                Modification de l'adresse
              </h1>
              <div className="flex flex-col lg:flex-row mb-4  gap-4 lg:gap-12">
                <FormField
                  name="name"
                  placeholder="Michel"
                  label="Prénom"
                  className="lg:w-2/5"
                />
                <FormField
                  name="lastname"
                  placeholder="Michel"
                  label="Nom"
                  className="lg:w-2/5"
                />
              </div>
              <FormField
                name="addressname"
                placeholder="Domicile"
                label="Nom de l'adresse"
                className="w-3/5 mb-4"
              />
              <div className="flex flex-col lg:flex-row mb-4 gap-4 lg:gap-12">
                <FormField
                  name="address"
                  placeholder="01 rue de ..."
                  label="Adresse"
                  className="lg:w-2/5"
                />
                <FormField
                  name="complete"
                  placeholder="bâtiment, rue..."
                  label="Complément d'adresse"
                  className="lg:w-2/5"
                />
              </div>
              <div className="flex flex-col lg:flex-row mb-4 lg:mb-12 gap-4 lg:gap-12">
                <FormField
                  name="Postalcode"
                  placeholder="00000"
                  label="Code Postal"
                  className="lg:w-2/5"
                />
                <FormField
                  name="city"
                  placeholder="Paris"
                  label="Ville"
                  className="lg:w-2/5"
                />
              </div>
            </div>
            <Button className="lg:w-1/5">ENREGISTRER</Button>
          </div>
        </Form>
      </Formik>
    </>
  )
}

export default EditAddress
