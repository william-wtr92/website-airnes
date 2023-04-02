import FooterMenu from "@/components/layouts/FooterMenu"
import * as yup from "yup"
import { Form, Formik } from "formik"
import Formfield from "@/components/utils/FormField"
import Button from "@/components/app/ui/Button"
import { NavLink } from "@/components/utils/NavLink"

const defaultValidationSchema = yup.object().shape({
  mail: yup.string().required().label("mail"),
})

const defaultInitialValues = {
  mail: "",
}
const OnForgotPassword = (props) => {
  const {
    onSubmit,
    initialValues = defaultInitialValues,
    validationSchema = defaultValidationSchema,
  } = props

  return (
    <>
      <main>
        <>
          <Formik
            onSubmit={onSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            <div className="gap-10 flex flex-col justify-center mx-6 mt-20 py-10 px-10 lg:w-[450px] lg:py-16 lg:mx-auto  lg:mt-28">
              <div className="text-center text-3xl text-black">
                Mot de passe oublié
              </div>
              <Form className="flex flex-col">
                <Formfield
                  type="email"
                  name="mail"
                  placeholder="Entrez votre e-mail"
                  label="E-mail"
                  className="mb-2 pb-10"
                />
                <div className="mt-6">
                  <NavLink href="/">
                    <Button className="w-full rounded-2xl">
                      REINITIALISER LE MOT DE PASSE
                    </Button>
                  </NavLink>
                </div>
              </Form>
            </div>
          </Formik>
        </>
      </main>
      <FooterMenu position="absolute" />
    </>
  )
}

export default OnForgotPassword
