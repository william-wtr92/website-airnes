import { Form, Formik } from "formik"
import Formfield from "@/components/utils/FormField"
import { NavLink } from "@/components/utils/NavLink"
import Button from "@/components/app/ui/Button"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"
import {
  loginInitialValues,
  loginValidationSchema,
} from "@/components/validation/validationyup"
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
    "login",
    "navbar",
    "footer",
  ])

  return {
    props: {
      ...translations,
    },
  }
}

const OnLoginForm = () => {
  const router = useRouter()

  const {
    actions: { signIn },
  } = useAppContext()

  const [error, setError] = useState(null)

  const handleLogin = useCallback(
    async (values) => {
      setError(null)

      const [err] = await signIn(values)

      if (err) {
        setError(err)

        return
      }

      router.push("/")
    },
    [signIn, router]
  )

  const { t } = useTranslation("login")

  return (
    <>
      <div className="flex flex-row gap-6">
        <div className="hidden lg:block lg:w-[60%] lg:h-screen lg:border-r-2 lg:shadow-2xl">
          <Image
            src="https://airnes.blob.core.windows.net/airnes/login3.jpg?sp=r&st=2023-05-28T10:08:49Z&se=2023-11-15T19:08:49Z&sv=2022-11-02&sr=b&sig=x%2Fk%2BxhFVq7v7z8Feh6f4c%2B9WpaFM9sSuU8z4UVONhww%3D"
            alt="meuble"
            width={1000}
            height={500}
            className="object-cover lg:w-full lg:h-full"
          />
        </div>
        <div className="lg:w-[40%]">
          <Formik
            onSubmit={handleLogin}
            initialValues={loginInitialValues}
            validationSchema={loginValidationSchema}
            error={error}
          >
            <div>
              <div className="flex justify-center mt-14 lg:mt-[20%]">
                <h1 className="font-bold text-2xl hover:cursor-pointer hover:text-[#615043] lg:text-2xl">
                  {t(`loginText`)}
                </h1>
              </div>
              <div className="flex justify-center mx-6 mt-6 py-10 px-6 lg:w-[600px] lg:px-10 lg:py-16 lg:mx-auto lg:rounded-md lg:mt-0">
                <Form className="flex flex-col">
                  <Formfield
                    type="email"
                    name="mail"
                    placeholder={t(`placeholderEmail`)}
                    label={t(`labelEmail`)}
                    className="mb-2"
                  />
                  <Formfield
                    type="password"
                    name="password"
                    placeholder={t(`placeholderPwd`)}
                    label={t(`labelPwd`)}
                    className="mb-2"
                  />
                  <div className="flex justify-center gap-4 my-4 lg:gap-4">
                    <div className="font-bold hover:text-[#927864] text-[10px] lg:text-sm">
                      <NavLink href="/support/forgotten_password">
                        {t(`forgotPassword`)}
                      </NavLink>
                    </div>
                    <div className="font-bold hover:text-[#927864] text-[10px] lg:text-sm">
                      <NavLink href="/signup">{t(`signup`)}</NavLink>
                    </div>
                  </div>

                  <div className="flex items-center justify-center mt-2">
                    <Button
                      className="bg-[#615043] hover:bg-[#927864] hover:cursor-pointer
             active:bg-[#615043] border border-black p-3.5 font-semibold rounded-md px-10 text-xs lg:px-24 lg:text-sm"
                    >
                      {t(`signin`)}
                    </Button>
                  </div>
                  {error && (
                    <div className="text-red-500 text-center my-4">
                      {t(`error`)}
                    </div>
                  )}
                </Form>
              </div>
            </div>
          </Formik>
        </div>
      </div>
    </>
  )
}

export default OnLoginForm
