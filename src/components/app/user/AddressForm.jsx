import { addressValidationSchema } from "@/components/validation/address"
import { Form, Formik } from "formik"
import FormField from "@/components/utils/FormField"
import Button from "@/components/app/ui/Button"
import { useTranslation } from "next-i18next"

const AddressForm = (props) => {
  const { onSubmit, initialValues, error } = props

  const { t } = useTranslation(`address_form`)

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={addressValidationSchema}
      error={error}
    >
      <Form>
        <div className="flex flex-col gap-10 items-center">
          <div className="w-4/5 lg:w-2/5">
            <div className="grid md:grid-cols-2 gap-5">
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
  )
}

export default AddressForm