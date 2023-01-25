import * as yup from "yup"
import { Form, Formik } from "formik"
import Formfield from "../utils/FormField"
import { NavLink } from "../utils/NavLink"
import Button from "@/components/utils/Button"

const defaultValidationSchema = yup.object().shape({
  mail: yup.string().required().label("mail"),
  pwd: yup.string().required().label("pwd"),
})

const defaultInitialValues = {
  mail: "",
  pwd: "",
}

const LoginForm = (props) => {
  const {
    onSubmit,
    initialValues = defaultInitialValues,
    validationSchema = defaultValidationSchema,
  } = props

  return (
    <>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <div className="flex justify-center mx-6 mt-20 py-10 px-10 shadow-2xl shadow-[#615043] lg:w-[600px] lg:py-16 lg:mx-auto lg:rounded-md lg:mt-32">
          <Form className="flex flex-col">
            <Formfield
              type="email"
              name="mail"
              placeholder="Entrez votre e-mail"
              label="E-mail"
              className="mb-2"
            />
            <Formfield
              type="password"
              name="pwd"
              placeholder="Entrez votre mot de passe"
              label="Mot de passe"
              className="mb-2"
            />
            <div className="flex justify-center gap-4 my-4">
              <div className="hover:text-[#615043]">
                <NavLink href="/user/lostpwd">Mot de passe oublié?</NavLink>
              </div>
              <div className="hover:text-[#615043]">
                <NavLink href="/signin">Inscrivez vous</NavLink>
              </div>
            </div>

            <div className="mt-2">
              <Button>SE CONNECTER</Button>
            </div>
          </Form>
        </div>
      </Formik>
    </>
  )
}

export default LoginForm
