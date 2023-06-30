import { Form, Formik } from "formik"
import Formfield from "@/components/utils/FormField"
import Button from "@/components/app/ui/Button"
import useAppContext from "@/web/hooks/useAppContext"
import { useCallback, useState } from "react"
import { useRouter } from "next/router"
import {
  resetpwdInitialValues,
  resetpwdValidationSchema,
} from "@/components/validation/reset_password"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { getAuthorization } from "@/web/helper/getAuthorization"

export const getServerSideProps = async (context) => {
  const { req, query, locale } = context

  const redirect = getAuthorization("user", req, query)

  if (redirect) {
    return redirect
  }

  const translations = await serverSideTranslations(locale, [
    "resetpwd",
    "navbar",
    "footer",
  ])

  return {
    props: {
      ...translations,
      userId: query.userId,
    },
  }
}

const ChangePassword = (props) => {
  const {
    actions: { ChangePassword },
  } = useAppContext()
  const { userId } = props

  const [error, setError] = useState("")

  const router = useRouter()

  const handlepost = useCallback(
    async (values) => {
      const [error] = await ChangePassword({
        userId,
        password: values.password,
      })

      if (error) {
        setError(error)

        return
      }

      router.push(`/user/${userId}/settings`)
    },
    [ChangePassword, router, userId]
  )

  const { t } = useTranslation("resetpwd")

  return (
    <>
      <Formik
        onSubmit={handlepost}
        initialValues={resetpwdInitialValues}
        validationSchema={resetpwdValidationSchema}
        error={error}
      >
        <div className="gap-10 flex flex-col justify-center mx-6 mt-20 py-10 px-10 lg:w-[450px] lg:py-16 lg:mx-auto  lg:mt-28">
          <div className="text-center text-3xl text-black">{t(`lostText`)}</div>
          <Form className="flex flex-col">
            <Formfield
              type="password"
              name="password"
              placeholder={t(`enterPlaceholder`)}
              label={t(`enterLabel`)}
              className="mb-2 pb-10"
            />
            <Formfield
              type="password"
              name="passwordConfirmation"
              placeholder={t(`confirmPlaceholder`)}
              label={t(`confirmLabel`)}
              className="mb-2 pb-10"
            />
            {error && <span className="text-red-700">{error}</span>}
            <div className="mt-6">
              <Button className="w-full rounded-2xl">{t(`buttonText`)}</Button>
            </div>
          </Form>
        </div>
      </Formik>
    </>
  )
}

export default ChangePassword
