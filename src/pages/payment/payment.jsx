import * as yup from "yup"
import {Form, Formik} from "formik"
import FormField from "@/components/utils/FormField"
import Button from "@/components/utils/Button"
import {NavLink} from "@/components/utils/NavLink"
import React, {useState} from "react"

const exampleCards = [
    {
        id: 0,
        type: "Mastercard 3456",
        number: "1234567890123456",
        name: "John Doe",
        expDate: "02/24",
        ccv: "000",
    }
    ,
    {
        id: 1,
        type: "Mastercard 4321",
        number: "6543210987654321",
        name: "John Doe",
        expDate: "02/24",
        ccv: "000",
    }
]

const defaultValidationSchema = yup.object().shape({
    fullName: yup.string()
        .required()
        .label("Nom complet"),
    cardNumber: yup.number()
        .required()
        .label("Numéro de carte")
        .test("len", "Le numéro est invalide.", val => val && val.toString().length === 16),
    expDate: yup.string()
        .length(5)
        .required()
        .label("Date d'expiration"),
    ccv: yup.number()
        .required()
        .label("CCV")
        .test("len", "Le ccv est invalide.", val => val && val.toString().length === 3),
})

const defaultInitialValues = {
    fullName: "",
    cardNumber: "",
    expDate: "",
    ccv: "",
}

const Payment = (props) => {
    const [selectedId, setSelectedId] = useState(0)

    const handleInput = (event) => {
        setSelectedId(event.target.options[event.target.selectedIndex].id)
    }

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
                            <div
                                className="grid gap-2 grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 lg:grid-rows-3 w-4/5 lg:w-1/2">
                                <div className="md:col-span-2 lg:col-span-4 md:w-1/2">
                                    <label htmlFor="cards"></label>
                                    <select id="cards"
                                            onChange={handleInput}
                                            className="bg-white border-2 border-gray-400 rounded-lg block w-full px-5 py-2">
                                        {
                                            exampleCards.map(card =>
                                                // eslint-disable-next-line react/jsx-key
                                                <option value={card.number} id={card.id}>{card.type}</option>
                                            )
                                        }
                                    </select>
                                </div>
                                <FormField
                                    name="cardNumber"
                                    label="Numéro de carte"
                                    className="lg:col-span-2"
                                    value={exampleCards[selectedId].number}
                                />
                                <FormField
                                    name="fullName"
                                    label="Nom complet"
                                    className="lg:col-span-2"
                                    value={exampleCards[selectedId].name}
                                />
                                <FormField
                                    name="expDate"
                                    label="Date d'expiration"
                                    className="lg:col-span-2"
                                    value={exampleCards[selectedId].expDate}
                                />
                                <FormField
                                    name="ccv"
                                    label="CCV"
                                    className="lg:col-span-2"
                                    value={exampleCards[selectedId].ccv}
                                />
                            </div>
                            <NavLink href="/payment/confirmation">
                                <Button>Payer</Button>
                            </NavLink>
                        </div>
                    </Form>
                </div>
            </Formik>
        </>
    )
}

export default Payment