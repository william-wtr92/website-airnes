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
import Image from "next/image"

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
      <div className="flex flex-row gap-6">
        <div className="hidden lg:block lg:w-[70%] lg:h-screen lg:border-r-2 lg:shadow-2xl">
          <Image
            src="https://airnes.blob.core.windows.net/airnes/login3.jpg?sp=r&st=2023-05-28T10:08:49Z&se=2023-11-15T19:08:49Z&sv=2022-11-02&sr=b&sig=x%2Fk%2BxhFVq7v7z8Feh6f4c%2B9WpaFM9sSuU8z4UVONhww%3D"
            alt="meuble"
            width={1000}
            height={1}
            className="lg:w-full lg:h-full"
          />
        </div>
        <div className="lg:w-[40%]">
          <Formik
            initialValues={inscriptionInitialValues}
            validationSchema={inscriptionValidationSchema}
            onSubmit={handlePost}
            error={error}
          >
            <div className="flex justify-center mt-12 lg:-mt-2">
              <div className="w-3/4">
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
                  <div className="flex justify-center gap-1 my-4 mx-2 text-[12px] whitespace-nowrap lg:text-[16px]">
                    <Field type="checkbox" name="cgu" className="mr-4" />
                    {t(`acceptText`)}
                    <div className="font-black  text-primary hover:text-primary-light">
                      <NavLink href="/help/cgu">{t(`conditionText`)}</NavLink>
                    </div>
                  </div>

                  <div className="flex justify-center font-bold gap-1 my-4 text-[12px] whitespace-nowrap lg:text-[16px]">
                    {t(`haveAccount`)}
                    <div className="text-primary-link">
                      <NavLink href="/user/login">{t(`signin`)}</NavLink>
                    </div>
                  </div>
                  <Button type="submit">{t(`btnSignup`)}</Button>
                </Form>
              </div>
            </div>
          </Formik>
        </div>
      </div>
    </>
  )
}

export default SignUp
