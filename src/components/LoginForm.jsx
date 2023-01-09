import * as yup from "yup";
import { Form, Formik } from "formik"
import Formfield from "./FormField";
import { NavLink } from "./NavLink";
import NavMenu from "./NavMenu";
import FooterMenu from "./FooterMenu";


const defaultValidationSchema = yup.object().shape({
  mail: yup.string().required().label("mail"),
  pwd: yup.string().required().label("pwd")
})

const defaultInitialValues = {
  mail: "",
  pwd:""
}


const LoginForm = (props) => {
  
  const {
    onSubmit,
    initialValues = defaultInitialValues,
    validationSchema = defaultValidationSchema,
  } = props


  return (
    <>
      <NavMenu />
      <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
        {({ values }) => (

      <div className="LoginForm absolute right-[50%] top-[30%]">
          <Form className="flex flex-col">
            <Formfield type="email"name="mail" placeholder="Entrez votre e-mail" label="E-mail" className="LoginInput w-[160%]"/>
            <Formfield type="password" name="pwd" placeholder="Entrez votre mot de passe" label="Mot de passe" className="LoginInput w-[160%]" />
            <div className="flex flex-row gap-6 relative left-16 my-4">
              <div className="LoginText hover:text-[#709861]">
                <NavLink href="/user/lostpwd">Mot de passe oublié?</NavLink>
              </div>
              <div className="LoginText hover:text-[#709861]">
                <NavLink href="/user/sigin">Inscrivez vous</NavLink>
              </div>
            </div>
            <div>
              <button type="submit" className={`LoginButton relative left-20 mt-4 py-3 px-10 bg-[#709861] rounded-sm text-white font-semibold ${values.pwd === '' ? 'bg-gray-400 cursor-not-allowed' : ''}`} disabled={values.pwd === ''}>
                  SE CONNECTER
              </button>
            </div>
          </Form>    
       </div>  
  
      )}
      </Formik>

      <FooterMenu />
    </>
   
  )
}

export default LoginForm;