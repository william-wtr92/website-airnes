import * as yup from "yup"
import { Form, Formik } from "formik"
import Formfield from "@/components/utils/FormField"
import Button from "@/components/app/ui/Button"
import useAppContext from "@/web/hooks/useAppContext"
import { useCallback, useState } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export const getServerSideProps = async (context) => {
  const { locale } = context

  const translations = await serverSideTranslations(locale, [
    "forgotpwd",
    "navbar",
    "footer",
  ])

  return {
    props: {
      ...translations,
    },
  }
}

const defaultValidationSchema = yup.object().shape({
  mail: yup.string().required().label("mail"),
})

const defaultInitialValues = {
  mail: "",
}
const OnForgotPassword = (props) => {
  const {
    actions: { sendMail },
  } = useAppContext()

  const [error, setError] = useState("")

  const router = useRouter()

  const handlepost = useCallback(
    async (values) => {
      const [error] = await sendMail(values)

      if (error) {
        setError(error)

        return
      }

      router.push("/")
    },
    [sendMail, router]
  )

  const {
    initialValues = defaultInitialValues,
    validationSchema = defaultValidationSchema,
  } = props

  const { t } = useTranslation("forgotpwd")

  return (
    <>
      <main>
        <>
          <Formik
            onSubmit={handlepost}
            initialValues={initialValues}
            validationSchema={validationSchema}
            error={error}
          >
            <div className="gap-10 flex flex-col justify-center mx-6 mt-20 py-10 px-10 lg:w-[450px] lg:py-16 lg:mx-auto  lg:mt-28">
              <div className="text-center text-3xl text-black">
                {t(`lostText`)}
              </div>
              <Form className="flex flex-col">
                <Formfield
                  type="email"
                  name="mail"
                  placeholder={t(`mailPlaceholder`)}
                  label={t(`mailLabel`)}
                  className="mb-2 pb-10"
                />
                <div className="mt-6">
                  <Button className="w-full rounded-2xl">
                    {t(`buttonText`)}
                  </Button>
                </div>
              </Form>
            </div>
          </Formik>
        </>
      </main>
    </>
  )
}

export default OnForgotPassword
