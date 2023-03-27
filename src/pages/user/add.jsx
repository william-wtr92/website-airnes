import * as yup from "yup"
import { Form, Formik } from "formik"
import FormField from "@/components/utils/FormField"
import Button from "@/components/app/ui/Button"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"
import useAppContext from "@/web/hooks/useAppContext"

const defaultValidationSchema = yup.object().shape({
  name: yup.string().required().label("Prénom"),
  lastName: yup.string().required().label("Nom"),
  addressName: yup.string().required().label("Nom de l'adresse"),
  address: yup.string().required().label("Adresse"),
  complete: yup.string().label("Complément d'adresse"),
  city: yup.string().required().label("Ville"),
  postal_code: yup.string().required().label("Code Postal"),
})
const defaultInitialValues = {
  name: "",
  lastName: "",
  addressName: "",
  address: "",
  complete: "",
  city: "",
  postal_code: "",
}

const AddAddress = (props) => {
  const {
    validationSchema = defaultValidationSchema,
    initialValues = defaultInitialValues,
  } = props

  const {
    actions: { addAddress },
    state: { session },
  } = useAppContext()

  const router = useRouter()
  const [error, setError] = useState(null)

  const handleSelect = useCallback(
    async (values) => {
      setError(null)
      const [err] = await addAddress(values)

      if (err) {
        setError(err)

        return
      }

      router.push(`/user/${session.user.id}/settings`)
    },
    [addAddress, router, session]
  )

  return (
    <>
      <Formik
        onSubmit={handleSelect}
        initialValues={initialValues}
        validationSchema={validationSchema}
        error={error}
      >
        <Form>
          <div className="flex flex-col my-10 items-center ">
            <div className="w-4/5 lg:w-2/5">
              <h1 className="font-bold text-xl my-8 text-center">
                Ajouter une adresse
              </h1>
              <div className="flex flex-col lg:flex-row mb-4  gap-4 lg:gap-12">
                <FormField
                  name="name"
                  placeholder="Michel"
                  label="Prénom"
                  className="lg:w-2/5"
                />
                <FormField
                  name="lastName"
                  placeholder="Michel"
                  label="Nom"
                  className="lg:w-2/5"
                />
              </div>
              <FormField
                name="addressName"
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
                  name="postal_code"
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

export default AddAddress
