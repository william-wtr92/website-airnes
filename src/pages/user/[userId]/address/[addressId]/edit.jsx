import { Form, Formik } from "formik"
import FormField from "@/components/utils/FormField"
import Button from "@/components/app/ui/Button"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"
import { addressValidationSchema } from "@/components/validation/validationyup"
import axios from "axios"
import routes from "@/web/routes"
import useAppContext from "@/web/hooks/useAppContext"
import config from "@/api/config"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export const getServerSideProps = async (context) => {
  const { query, locale } = context

  const { data } = await axios.get(
    `${config.path}api${routes.api.user.address.addressData(
      query.userId,
      query.addressId
    )}`
  )

  const translations = await serverSideTranslations(locale, [
    "editaddress",
    "navbar",
    "footer",
  ])

  if (!data.result) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: {
      data: data,
      userId: query.userId,
      addressId: query.addressId,
      ...translations,
    },
  }
}

const EditAddress = (props) => {
  const { data, userId, addressId } = props
  const {
    actions: { patchAddress },
  } = useAppContext()

  const [error, setError] = useState(null)

  const addressInitialVAlue = {
    name: data.result.name,
    lastName: data.result.lastName,
    addressName: data.result.addressName,
    address: data.result.address,
    complete: data.result.complete,
    city: data.result.city,
    postal_code: data.result.postal_code,
  }

  const router = useRouter()

  const handleModify = useCallback(
    async (values) => {
      setError(null)
      const [err] = await patchAddress(values, userId, addressId)

      if (err) {
        setError(err)

        return
      }

      router.push(`/user/${userId}/settings`)
    },
    [patchAddress, router, userId, addressId]
  )

  const { t } = useTranslation("editaddress")

  return (
    <>
      <Formik
        onSubmit={handleModify}
        initialValues={addressInitialVAlue}
        validationSchema={addressValidationSchema}
        error={error}
      >
        <Form>
          <div className="flex flex-col my-10 items-center ">
            <div className="w-4/5 lg:w-2/5">
              <h1 className="font-bold text-xl my-8 text-center">
                {t(`addText`)}
              </h1>
              <div className="flex flex-col lg:flex-row mb-4  gap-4 lg:gap-12">
                <FormField
                  name="name"
                  placeholder={t(`firstnamePlaceholder`)}
                  label={t(`firstnameLabel`)}
                  className="lg:w-2/5"
                />
                <FormField
                  name="lastName"
                  placeholder={t(`lastnamePlaceholder`)}
                  label={t(`lastnameLabel`)}
                  className="lg:w-2/5"
                />
              </div>
              <FormField
                name="addressName"
                placeholder={t(`addressNamePlaceholder`)}
                label={t(`addressNameLabel`)}
                className="w-3/5 mb-4"
              />
              <div className="flex flex-col lg:flex-row mb-4 gap-4 lg:gap-12">
                <FormField
                  name="address"
                  placeholder={t(`addressFullPlaceholder`)}
                  label={t(`addressFullLabel`)}
                  className="lg:w-2/5"
                />
                <FormField
                  name="complete"
                  placeholder={t(`addressComplementPlaceholder`)}
                  label={t(`addressComplementLabel`)}
                  className="lg:w-2/5"
                />
              </div>
              <div className="flex flex-col lg:flex-row mb-4 lg:mb-12 gap-4 lg:gap-12">
                <FormField
                  name="postal_code"
                  placeholder={t(`postalPlaceholder`)}
                  label={t(`postalLabel`)}
                  className="lg:w-2/5"
                />
                <FormField
                  name="city"
                  placeholder={t(`cityPlaceholder`)}
                  label={t(`cityLabel`)}
                  className="lg:w-2/5"
                />
              </div>
            </div>
            <Button className="lg:w-1/5">{t(`buttonText`)}</Button>
          </div>
        </Form>
      </Formik>
    </>
  )
}

export default EditAddress
