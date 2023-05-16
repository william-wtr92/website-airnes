import Button from "@/components/app/ui/Button"
import FormField from "@/components/utils/FormField"
import { NavLink } from "@/components/utils/NavLink"
import {
  inscriptionInitialValues,
  inscriptionValidationSchema,
} from "@/components/validation/validationyup"
import { Form, Formik, Field } from "formik"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"
import useAppContext from "@/web/hooks/useAppContext"
import { redirectToHomeIfLoggedIn } from "@/web/helper/getServerSidePropsLog"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"

export const getServerSideProps = async (context) => {
  const { locale } = context

  const redirectToHomeIfLoggedInResult = await redirectToHomeIfLoggedIn(context)

  if (redirectToHomeIfLoggedInResult) {
    return redirectToHomeIfLoggedInResult
  }

  const translations = await serverSideTranslations(locale, [
    "signup",
    "navbar",
    "footer",
  ])

  return {
    props: {
      ...translations,
    },
  }
}

const SignUp = () => {
  const {
    actions: { signUp },
  } = useAppContext()

  const [error, setError] = useState(null)
  const router = useRouter()

  const handlePost = useCallback(
    async (values) => {
      const [err] = await signUp(values)

      if (err) {
        setError(err)

        return
      }

      router.push("/user/login")
    },
    [signUp, router]
  )

  const { t } = useTranslation("signup")

  return (
    <>
      <Formik
        initialValues={inscriptionInitialValues}
        validationSchema={inscriptionValidationSchema}
        onSubmit={handlePost}
        error={error}
      >
        <div className="flex justify-center mt-12 lg:-mt-6">
          <div className=" w-2/3 lg:w-1/3 ">
            <h1 className="text-center mb-8 lg:mt-16 text-3xl font-bold hover:cursor-pointer hover:text-[#615043]">
              {t(`signupText`)}
            </h1>
            <Form className="flex flex-col">
              <FormField
                type="text"
                name="name"
                label={t(`labelName`)}
                placeholder={t(`placeholderName`)}
                className=" mb-2"
              />
              <FormField
                type="email"
                name="mail"
                placeholder={t(`placeholderEmail`)}
                label={t(`labelEmail`)}
                className=" mb-2"
              />
              <FormField
                type="password"
                name="password"
                placeholder={t(`placeholderPwd`)}
                rows="4"
                label={t(`labelPwd`)}
                className=" mb-2 "
              />
              <FormField
                type="password"
                name="passwordConfirmation"
                placeholder={t(`placeholderConfirmPwd`)}
                rows="4"
                label={t(`labelConfirmPwd`)}
                className="mb-2 lg:mb-8"
              />
              <div className="flex justify-center gap-1 my-4  whitespace-nowrap">
                <Field type="checkbox" name="cgu" className="mr-4" />
                {t(`acceptText`)}
                <div className="font-bold  text-primary-linkorange">
                  <NavLink href="/help/cgu">{t(`conditionText`)}</NavLink>
                </div>
              </div>

              <div className="flex justify-center font-bold gap-1 my-4  whitespace-nowrap">
                {t(`haveAccount`)}
                <div className=" text-primary-link">
                  <NavLink href="/user/login">{t(`signin`)}</NavLink>
                </div>
              </div>
              <Button type="submit">{t(`btnSignup`)}</Button>
            </Form>
          </div>
        </div>
      </Formik>
    </>
  )
}

export default SignUp
