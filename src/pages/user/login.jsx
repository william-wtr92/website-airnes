import { Form, Formik } from "formik"
import Formfield from "@/components/utils/FormField"
import { NavLink } from "@/components/utils/NavLink"
import Button from "@/components/utils/Button"
import FooterMenu from "@/components/home/FooterMenu"
import { useRouter } from "next/router"
import { useCallback } from "react"
import {
  loginInitialValues,
  loginValidationSchema,
} from "@/components/validation/validationyup"

const OnLoginForm = () => {
  const router = useRouter()

  const handleLogin = useCallback(() => {
    router.push("/")
  }, [router])

  return (
    <>
      <main>
        <Formik
          onSubmit={handleLogin}
          initialValues={loginInitialValues}
          validationSchema={loginValidationSchema}
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
                  name="pwd"
                  placeholder="Mot de passe"
                  label="Mot de passe"
                  className="mb-2"
                />
                <div className="flex justify-center gap-2 my-4 lg:gap-4">
                  <div className="font-bold hover:text-[#927864] text-xs lg:text-sm">
                    <NavLink href="/user/lostpwd">Mot de passe oublié?</NavLink>
                  </div>
                  <div className="font-bold hover:text-[#927864] text-xs lg:text-sm">
                    <NavLink href="/signin">Inscrivez vous</NavLink>
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
