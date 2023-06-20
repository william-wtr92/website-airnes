import Button from "@/components/app/ui/Button"
import FormField from "@/components/utils/FormField"
import {
  contactInitialValues,
  contactValidationSchema,
} from "@/components/validation/validationyup"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"
import useAppContext from "@/web/hooks/useAppContext"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"

export const getServerSideProps = async (context) => {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "contact",
        "navbar",
        "footer",
      ])),
    },
  }
}

const Contact = () => {
  const {
    actions: { contact },
  } = useAppContext()

  const [error, setError] = useState("")

  const router = useRouter()

  const handlePost = useCallback(
    async (values) => {
      const [error] = await contact(values)

      if (error) {
        setError(error)

        return
      }

      router.push("/")
    },
    [contact, router]
  )

  const { t } = useTranslation("contact")

  return (
    <>
      <Formik
        initialValues={contactInitialValues}
        validationSchema={contactValidationSchema}
        onSubmit={handlePost}
        error={error}
      >
        <div className="flex justify-center mt-20 lg:mt-20 ">
          <div className=" w-2/3 lg:w-1/3 p-6 rounded-lg">
            <h1 className="text-center mb-16 text-3xl font-bold hover:text-[#615043] hover:cursor-pointer">
              {t(`contactUs`)}
            </h1>
            <Form className="flex flex-col">
              <FormField
                type="email"
                name="mail"
                placeholder={t(`placeholderEmail`)}
                label={t(`labelEmail`)}
                className=" mb-2"
              />
              <FormField
                type="text"
                name="topic"
                label={t(`labelSubject`)}
                placeholder={t(`placeholderSubject`)}
                className=" mb-2"
              />
              <FormField
                type="text"
                name="content"
                placeholder={t(`placeholderContent`)}
                rows="4"
                label={t(`labelContent`)}
                className="mb-8"
              />
              <Button type="submit">{t(`send`)}</Button>
            </Form>
          </div>
        </div>
      </Formik>
    </>
  )
}

export default Contact
