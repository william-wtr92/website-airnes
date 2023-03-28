import { Form, Formik } from "formik"
import Formfield from "@/components/utils/FormField"
import { NavLink } from "@/components/utils/NavLink"
import Button from "@/components/app/ui/Button"
import FooterMenu from "@/components/layouts/FooterMenu"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"
import {
  loginInitialValues,
  loginValidationSchema,
} from "@/components/validation/validationyup"
import useAppContext from "@/web/hooks/useAppContext"

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

  return (
    <>
      <main>
        <Formik
          onSubmit={handleLogin}
          initialValues={loginInitialValues}
          validationSchema={loginValidationSchema}
          error={error}
        >
          <div>
            <div className="flex justify-center mt-14 lg:my-12">
              <h1 className="font-bold text-2xl hover:cursor-pointer hover:text-[#615043] lg:text-4xl">
                Connexion
              </h1>
            </div>
            <div className="flex justify-center mx-6 mt-6 py-10 px-6 border-2 lg:w-[600px] lg:px-10 lg:py-16 lg:mx-auto lg:rounded-md lg:mt-0">
              <Form className="flex flex-col">
                <Formfield
                  type="email"
                  name="mail"
                  placeholder="E-mail"
                  label="E-mail"
                  className="mb-2"
                />
                <Formfield
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  label="Mot de passe"
                  className="mb-2"
                />
                <div className="flex justify-center gap-2 my-4 lg:gap-4">
                  <div className="font-bold hover:text-[#927864] text-xs lg:text-sm">
                    <NavLink href="/user/#">Mot de passe oublié?</NavLink>
                  </div>
                  <div className="font-bold hover:text-[#927864] text-xs lg:text-sm">
                    <NavLink href="/signup">Inscrivez vous</NavLink>
                  </div>
                </div>

                <div className="flex items-center justify-center mt-2">
                  <Button
                    className="bg-[#615043] hover:bg-[#927864] hover:cursor-pointer
             active:bg-[#615043] border border-black p-3.5 font-semibold rounded-md px-10 text-xs lg:text-sm"
                  >
                    SE CONNECTER
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </Formik>
      </main>
      <FooterMenu position="absolute" />
    </>
  )
}

export default OnLoginForm
