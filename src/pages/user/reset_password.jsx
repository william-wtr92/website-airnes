import { Form, Formik } from "formik"
import Formfield from "@/components/utils/FormField"
import Button from "@/components/app/ui/Button"
import useAppContext from "@/web/hooks/useAppContext"
import { useCallback, useState } from "react"
import { useRouter } from "next/router"
import {
  resetpwdInitialValues,
  resetpwdValidationSchema,
} from "@/components/validation/reset_password"

export const getServerSideProps = async (context) => {
  const { tokken } = context.query

  return {
    props: {
      tokken,
    },
  }
}

const OnForgotPassword = (props) => {
  const {
    actions: { resetPwd },
  } = useAppContext()
  const { tokken } = props

  const [error, setError] = useState("")

  const router = useRouter()

  const handlepost = useCallback(
    async (values) => {
      const [error] = await resetPwd({ tokken, password: values.password })

      if (error) {
        setError(error)

        return
      }

      router.push("/")
    },
    [resetPwd, router, tokken]
  )

  return (
    <>
      <Formik
        onSubmit={handlepost}
        initialValues={resetpwdInitialValues}
        validationSchema={resetpwdValidationSchema}
        error={error}
      >
        <div className="gap-10 flex flex-col justify-center mx-6 mt-20 py-10 px-10 lg:w-[450px] lg:py-16 lg:mx-auto  lg:mt-28">
          <div className="text-center text-3xl text-black">
            Mot de passe oublié
          </div>
          <Form className="flex flex-col">
            <Formfield
              type="password"
              name="password"
              placeholder="Entrez votre nouveau mot de passe"
              label="Mot de passe"
              className="mb-2 pb-10"
            />
            <Formfield
              type="password"
              name="passwordConfirmation"
              placeholder="Comfirmé votre mot de passe"
              label="Comfirmation mot de passe"
              className="mb-2 pb-10"
            />
            <div className="mt-6">
              <Button className="w-full rounded-2xl">Comfirmé</Button>
            </div>
          </Form>
        </div>
      </Formik>
    </>
  )
}

export default OnForgotPassword
