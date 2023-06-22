import { loginInitialValues, loginValidationSchema } from "@/components/validation/validationyup"
import { Form, Formik } from "formik"
import Formfield from "@/components/utils/FormField"
import { NavLink } from "@/components/utils/NavLink"
import Button from "@/components/app/ui/Button"
import { useRouter } from "next/router"
import useAppContext from "@/web/hooks/useAppContext"
import { useCallback, useState } from "react"
import { useTranslation } from "next-i18next"

const LoginForm = () => {
  const { t } = useTranslation("login")

  const router = useRouter()

  const {
    actions: { signIn }
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

  return (
    <Formik
      onSubmit={handleLogin}
      initialValues={loginInitialValues}
      validationSchema={loginValidationSchema}
      error={error}
    >
      <div>
        <div
          className="flex justify-center mx-6 mt-6 py-10 px-6 lg:w-[600px] lg:px-10 lg:py-16 lg:mx-auto lg:rounded-md lg:mt-0">
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
            <div className="flex justify-around p-4">
              <div className="font-bold hover:text-[#927864] text-[12px]">
                <NavLink href="/support/forgotten_password">
                  {t(`forgotPassword`)}
                </NavLink>
              </div>
              <div className="font-bold hover:text-[#927864] text-[12px]">
                <NavLink href="/signup">{t(`signup`)}</NavLink>
              </div>
            </div>

            <div className="flex items-center justify-center mt-2">
              <Button
                className="bg-[#615043] hover:bg-[#927864] hover:cursor-pointer
             active:bg-[#615043] border border-black p-3.5 font-semibold rounded-md px-10 text-xs lg:px-24 lg:text-sm"
                type="submit"
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
  )
}

export default LoginForm