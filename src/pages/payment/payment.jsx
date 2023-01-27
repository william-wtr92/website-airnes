import * as yup from "yup"
import { Form, Formik } from "formik"
import FormField from "@/components/utils/FormField"
import Button from "@/components/utils/Button"
import { NavLink } from "@/components/utils/NavLink"

const exampleCards = [
  {
    id: 1,
    type: "Mastercard 3456",
    number: "1234567890123456",
    name: "John Doe",
    expDate: "02/24",
    ccv: "000",
  },
  {
    id: 2,
    type: "Mastercard 4321",
    number: "6543210987654321",
    name: "John Doe",
    expDate: "02/24",
    ccv: "000",
  },
]

const defaultValidationSchema = yup.object().shape({
  /* Ajouter les règles du select */
  fullName: yup.string().required().label("Nom complet"),
  cardNumber: yup
    .number()
    .required()
    .label("Numéro de carte")
    .test(
      "len",
      "Le numéro est invalide.",
      (val) => val && val.toString().length === 16
    ),
  expDate: yup.string().length(5).required().label("Date d'expiration"),
  ccv: yup
    .number()
    .required()
    .label("CCV")
    .test(
      "len",
      "Le ccv est invalide.",
      (val) => val && val.toString().length === 3
    ),
})

const defaultInitialValues = {
  /* Ajouter les values du select */
  fullName: "",
  cardNumber: "",
  expDate: "",
  ccv: "",
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
              <h1 className="font-bold text-xl">Paiement</h1>
              <div className="grid gap-2 grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 lg:grid-rows-3 w-4/5 lg:w-1/2">
                <div className="md:col-span-2 lg:col-span-4 md:w-1/2">
                  <select
                    id="countries"
                    className="bg-white border-2 border-gray-400 rounded-lg block w-full px-5 py-2"
                  >
                    <option defaultValue>
                      Choisir une carte déjà enregistrée
                    </option>
                    {exampleCards.map((card) => (
                      // eslint-disable-next-line react/jsx-key
                      <option value={card.number} id={card.id}>
                        {card.type}
                      </option>
                    ))}
                  </select>
                </div>
                <FormField
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  label="Numéro de carte"
                  className="lg:col-span-2"
                />
                <FormField
                  name="fullName"
                  placeholder="John Doe"
                  label="Nom complet"
                  className="lg:col-span-2"
                />
                <FormField
                  name="expDate"
                  placeholder="02/25"
                  label="Date d'expiration"
                  className="lg:col-span-2"
                />
                <FormField
                  name="ccv"
                  placeholder="000"
                  label="CCV"
                  className="lg:col-span-2"
                />
              </div>
              <NavLink href="/payment/confirmation">
                <Button
                  className="my-6 bg-[#615043] hover:bg-[#927864] hover:cursor-pointer
             active:bg-[#615043] border border-black p-3.5 font-semibold rounded-md px-20"
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
