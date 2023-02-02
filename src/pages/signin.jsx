import FooterMenu from "@/components/home/FooterMenu"
import Button from "@/components/utils/Button"
import FormField from "@/components/utils/FormField"
import { NavLink } from "@/components/utils/NavLink"
import {
  inscriptionInitialValues,
  inscriptionValidationSchema,
} from "@/components/validation/validationyup"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { useCallback } from "react"

const Signin = () => {
  const router = useRouter()

  const handlpost = useCallback(() => {
    router.push("/")
  }, [router])

  return (
    <>
      <Formik
        onSubmit={handlpost}
        initialValues={inscriptionInitialValues}
        validationSchema={inscriptionValidationSchema}
      >
        <div className="flex justify-center mt-12 lg:mt-26 ">
          <div className=" w-2/3 lg:w-1/3 ">
            <h1 className="text-center mb-8 lg:mt-16 text-3xl font-bold">
              Inscription
            </h1>
            <Form className="flex flex-col">
              <FormField
                type="text"
                name="name"
                label="Nom complet*"
                className=" mb-2"
              />
              <FormField
                type="email"
                name="mail"
                placeholder="Entrez votre e-mail"
                label="E-mail*"
                className=" mb-2"
              />
              <FormField
                type="password"
                name="password"
                placeholder="Entrez votre message"
                rows="4"
                label="Mot de passe*"
                className=" mb-2 "
              />
              <FormField
                type="password"
                name="passwordConfirmation"
                placeholder="Entrez votre message"
                rows="4"
                label="Comfirmation du mot de passe*"
                className="mb-2 lg:mb-8 "
              />
              <div className="flex justify-center gap-4 my-4 text-bold whitespace-nowrap">
                Deja un compte ?
                <div className="font-bold hover:text-primary-light">
                  <NavLink href="/user/login">connectez-vous</NavLink>
                </div>
              </div>
              <Button type="submit">S'INSCRIRE</Button>
            </Form>
          </div>
        </div>
      </Formik>

      <FooterMenu position="absolute" />
    </>
  )
}

export default Signin
