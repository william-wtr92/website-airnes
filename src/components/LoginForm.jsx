import * as yup from "yup"
import { Form, Formik } from "formik"
import Formfield from "./FormField"
import { NavLink } from "./NavLink"
import Button from "@/components/Button"

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
        {({ values }) => (
          <div className="flex justify-center items-center">
            <div className="w-1/3">
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
                  <div className="hover:text-[#64cb3f]">
                    <NavLink href="/user/lostpwd">Mot de passe oublié?</NavLink>
                  </div>
                  <div className="hover:text-[#64cb3f]">
                    <NavLink href="/user/sigin">Inscrivez vous</NavLink>
                  </div>
                </div>

                <div className="text-center mt-2">
                  <Button
                    type="submit"
                    className={`bg-[#709861] text-white py-2 px-4 rounded ${
                      values.pwd === "" ? "bg-gray-400 cursor-not-allowed" : ""
                    }`}
                    disabled={values.pwd === ""}
                  >
                    SE CONNECTER
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </>
  )
}

export default LoginForm
