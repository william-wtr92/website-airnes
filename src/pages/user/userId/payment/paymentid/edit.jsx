import * as yup from "yup"
import { Field, Form, Formik } from "formik"
import FormField from "@/components/utils/FormField"
import Button from "@/components/utils/Button"
import { useRouter } from "next/router"
import { useCallback } from "react"

const optionstate = [
  {
    name: "VISA",
    value: "visa",
  },
  {
    name: "Mastercard",
    value: "mastercard",
  },
  {
    name: "Americain Express",
    value: "american-express",
  },
]
const defaultValidationSchema = yup.object().shape({
  /* Ajouter les règles du select */
  type: yup.string().required().label("Tpype de carte"),
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
  type: "",
  fullName: "",
  cardNumber: "",
  expDate: "",
  ccv: "",
}

const EditPayment = (props) => {
  const {
    initialValues = defaultInitialValues,
    validationSchema = defaultValidationSchema,
  } = props

  const router = useRouter()
  const handleSelect = useCallback(() => {
    router.push("/user/userId/accountsettings")
  }, [router])

  return (
    <>
      <Formik
        onSubmit={handleSelect}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form>
          <div className="flex flex-col my-10 items-center ">
            <div className="w-4/5 lg:w-2/5">
              <h1 className="font-bold text-xl my-8 text-center">
                Modification carte
              </h1>
              <div className="mb-4 w-4/5 lg:w-2/5">
                <p className="text-md font-semibold">Type de carte</p>
                <Field
                  as="select"
                  name="type"
                  className="border-2 rounded-md border-gray-400 px-10 py-1 cursor-pointer w-full"
                >
                  {optionstate.map((option, i) => (
                    <option key={i} value={option.value}>
                      {option.value}
                    </option>
                  ))}
                </Field>
              </div>
              <div className="flex flex-col lg:flex-row mb-4  gap-4 lg:gap-12">
                <FormField
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  label="Numéro de carte"
                  className="lg:w-2/5"
                />
                <FormField
                  name="fullName"
                  placeholder="John Doe"
                  label="Nom complet"
                  className="lg:w-2/5"
                />
              </div>
              <div className="flex flex-col lg:flex-row mb-4 lg:mb-12 gap-4 lg:gap-12">
                <FormField
                  name="expDate"
                  placeholder="02/25"
                  label="Date d'expiration"
                  className="lg:w-1/3"
                />
                <FormField
                  name="ccv"
                  placeholder="000"
                  label="CCV"
                  className="lg:w-1/3"
                />
              </div>
            </div>
            <Button className="lg:w-1/5" type="submit">
              ENREGISTRER
            </Button>
          </div>
        </Form>
      </Formik>
    </>
  )
}

export default EditPayment
