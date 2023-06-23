import * as yup from "yup"
import { Form, Formik } from "formik"
import FormField from "@/components/utils/FormField"
import Button from "@/components/app/ui/Button"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"
import useAppContext from "@/web/hooks/useAppContext"
import { useTranslation } from "react-i18next"

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

const AddAddressForm = (props) => {
  const {
    validationSchema = defaultValidationSchema,
    initialValues = defaultInitialValues,
    redirect,
    setDisplay,
    refreshData,
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

      if (redirect) {
        router.push(`/user/${session.user.id}/settings`)
      }

      if (setDisplay) {
        refreshData()
        setDisplay(false)
      }
    },
    [addAddress, router, session, redirect, setDisplay, refreshData]
  )

  const { t } = useTranslation("address_form")

  return (
    <>
      <Formik
        onSubmit={handleSelect}
        initialValues={initialValues}
        validationSchema={validationSchema}
        error={error}
      >
        <Form>
          <div className="flex flex-col gap-10 items-center">
            <div className="w-4/5 lg:w-2/5">
              <div className="grid md:grid-cols-2 gap-5">
                <h1 className="font-bold text-xl my-8 text-center col-span-2">
                  {t("addText")}
                </h1>
                <FormField
                  name="name"
                  placeholder={t(`firstnamePlaceholder`)}
                  label={t(`firstnameLabel`)}
                />
                <FormField
                  name="lastName"
                  placeholder={t(`lastnamePlaceholder`)}
                  label={t(`lastnameLabel`)}
                />
                <FormField
                  name="addressName"
                  placeholder={t(`addressNamePlaceholder`)}
                  label={t(`addressNameLabel`)}
                  className="md:col-span-2"
                />
                <FormField
                  name="address"
                  placeholder={t(`addressFullPlaceholder`)}
                  label={t(`addressFullLabel`)}
                  className="md:col-span-2"
                />
                <FormField
                  name="complete"
                  placeholder={t(`addressComplementPlaceholder`)}
                  label={t(`addressComplementLabel`)}
                />
                <FormField
                  name="postal_code"
                  placeholder={t(`postalPlaceholder`)}
                  label={t(`postalLabel`)}
                  className="md:col-start-1"
                />
                <FormField
                  name="city"
                  placeholder={t(`cityPlaceholder`)}
                  label={t(`cityLabel`)}
                />
              </div>
            </div>
            <Button>{t(`buttonText`)}</Button>
          </div>
        </Form>
      </Formik>
    </>
  )
}

export default AddAddressForm
