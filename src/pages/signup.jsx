import FooterMenu from "@/components/layouts/FooterMenu"
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

const SignUp = () => {
  const {
    actions: { signUp },
  } = useAppContext()
  const [error, setError] = useState(null)
  const router = useRouter()

  const handlpost = useCallback(
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

  return (
    <>
      <Formik
        initialValues={inscriptionInitialValues}
        validationSchema={inscriptionValidationSchema}
        onSubmit={handlpost}
        error={error}
      >
        <div className="flex justify-center mt-12 lg:-mt-6">
          <div className=" w-2/3 lg:w-1/3 ">
            <h1 className="text-center mb-8 lg:mt-16 text-3xl font-bold hover:cursor-pointer hover:text-[#615043]">
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
                name="email"
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
                className="mb-2 lg:mb-8"
              />
              <div className="flex justify-center gap-1 my-4  whitespace-nowrap">
                <Field type="checkbox" name="cgu" className="mr-4" />
                J'accepte les
                <div className="font-bold  text-primary-linkorange">
                  <NavLink href="/help/cgu">condition d'utilisation</NavLink>
                </div>
              </div>

              <div className="flex justify-center font-bold gap-1 my-4  whitespace-nowrap">
                Deja un compte ?
                <div className=" text-primary-link">
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

export default SignUp
