import * as yup from "yup"
import { Form, Formik } from "formik"
import FormField from "@/components/utils/FormField"
import Button from "@/components/utils/Button"
import { NavLink } from "@/components/utils/NavLink"

const exampleAddresses = [
  {
    id: 0,
    name: "Domicile",
    address: "19 rue de la Lune",
    complete: "batiment 21",
    city: "NY",
  },
  {
    id: 1,
    name: "Maison parents",
    address: "69 rue de la Lune",
    complete: "batiment 07",
    city: "NY",
  },
]

const defaultValidationSchema = yup.object().shape({
  /* Ajouter les règles du select */
  firstName: yup.string().required().label("Prénom"),
  name: yup.string().required().label("Nom"),
  /* Faire les règles du select */
  address: yup.string().required().label("Adresse"),
  complete: yup.number().label("Complément d'adresse"),
  city: yup.string().required().label("Ville"),
})

const defaultInitialValues = {
  /* Ajouter les values du select */
  firstName: "",
  name: "",
  address: "",
  complete: "",
  city: "",
}

/*const handleSelect = () = {
    //
}*/

const Payment = (props) => {
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
        <div>
          <Form>
            <div className="flex flex-col items-center my-10 space-y-5">
              <h1 className="font-bold text-xl">Livraison</h1>
              <div className="grid gap-2 grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 lg:grid-rows-3 w-4/5 lg:w-1/2">
                <FormField
                  name="firstName"
                  placeholder="John"
                  label="Prénom"
                  className="lg:col-span-2"
                />
                <FormField
                  name="name"
                  placeholder="Doe"
                  label="Nom"
                  className="lg:col-span-2"
                />
                <div className="md:col-span-2 lg:col-span-4 md:w-1/2">
                  <label htmlFor="addresses"></label>
                  <select
                    id="addresses"
                    className="bg-white border-2 border-gray-400 rounded-lg block w-full px-5 py-2"
                  >
                    <option defaultValue>
                      Choisir une adresse déjà enregistrée
                    </option>
                    {exampleAddresses.map((address) => (
                      // eslint-disable-next-line react/jsx-key
                      <option value={address.name} id={address.id}>
                        {address.name}
                      </option>
                    ))}
                  </select>
                </div>
                <FormField
                  name="address"
                  placeholder="01 rue de ..."
                  label="Adresse"
                  className="lg:col-span-2"
                />
                <FormField
                  name="complete"
                  placeholder="bâtiment, rue..."
                  label="Complément d'adresse"
                  className="lg:col-span-2"
                />
                <FormField
                  name="city"
                  placeholder="Paris"
                  label="Ville"
                  className="lg:col-span-2"
                />
              </div>
              <NavLink href="/payment/payment">
                <Button
                  className="bg-[#615043] hover:bg-[#927864] hover:cursor-pointer
             active:bg-[#615043] border border-black p-3.5 font-semibold rounded-md px-20 "
                >
                  Payer
                </Button>
              </NavLink>
            </div>
          </Form>
        </div>
      </Formik>
    </>
  )
}

export default Payment
