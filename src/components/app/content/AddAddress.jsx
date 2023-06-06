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

  const { t } = useTranslation("addaddress")

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
                {t("addText")}
              </h1>
              <div className="flex flex-col lg:flex-row mb-4  gap-4 lg:gap-12">
                <FormField
                  name="name"
                  placeholder={t("firstnamePlaceholder")}
                  label={t("firstnameLabel")}
                  className="lg:w-2/5"
                />
                <FormField
                  name="lastName"
                  placeholder={t("lastnamePlaceholder")}
                  label={t("lastnameLabel")}
                  className="lg:w-2/5"
                />
              </div>
              <FormField
                name="addressName"
                placeholder={t("addressNamePlaceholder")}
                label={t("addressNameLabel")}
                className="w-3/5 mb-4"
              />
              <div className="flex flex-col lg:flex-row mb-4 gap-4 lg:gap-12">
                <FormField
                  name="address"
                  placeholder={t("addressFullPlaceholder")}
                  label={t("addressFullLabel")}
                  className="lg:w-2/5"
                />
                <FormField
                  name="complete"
                  placeholder={t("addressComplementPlaceholder")}
                  label={t("addressComplementLabel")}
                  className="lg:w-2/5"
                />
              </div>
              <div className="flex flex-col lg:flex-row mb-4 lg:mb-12 gap-4 lg:gap-12">
                <FormField
                  name="postal_code"
                  placeholder={t("postalPlaceholder")}
                  label={t("postalLabel")}
                  className="lg:w-2/5"
                />
                <FormField
                  name="city"
                  placeholder={t("cityPlaceholder")}
                  label={t("cityLabel")}
                  className="lg:w-2/5"
                />
              </div>
            </div>
            <Button className="lg:w-1/5">{t("buttonText")}</Button>
          </div>
        </Form>
      </Formik>
    </>
  )
}

export default AddAddressForm
