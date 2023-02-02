import * as yup from "yup"
import { Form, Formik } from "formik"
import FormField from "@/components/utils/FormField"
import Button from "@/components/utils/Button"
import React, { useCallback } from "react"
import { useRouter } from "next/router"

const defaultValidationSchema = yup.object().shape({
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
  fullName: "",
  cardNumber: "",
  expDate: "",
  ccv: "",
}

const Payment = (props) => {
  const { validationSchema = defaultValidationSchema } = props

  const router = useRouter()
  const handleSubmit = useCallback(() => {
    router.push("/payment/confirmation")
  }, [router])

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        initialValues={defaultInitialValues}
        validationSchema={validationSchema}
      >
        <div>
          <Form>
            <div className="flex flex-col items-center my-10 space-y-5 md:mt-20 lg:mt-32">
              <h1 className="font-bold text-xl">Paiement</h1>
              <div className="grid gap-2 grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 lg:grid-rows-2 w-4/5 lg:w-1/2">
                <FormField
                  name="cardNumber"
                  label="Numéro de carte"
                  className="lg:col-span-2"
                />
                <FormField
                  name="fullName"
                  label="Nom complet"
                  className="lg:col-span-2"
                />
                <FormField
                  name="expDate"
                  label="Date d'expiration"
                  className="lg:col-span-2"
                />
                <FormField name="ccv" label="CCV" className="lg:col-span-2" />
              </div>
              <Button type="submit">Payer</Button>
            </div>
          </Form>
        </div>
      </Formik>
    </>
  )
}

export default Payment
