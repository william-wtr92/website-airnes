import * as yup from "yup"
import {Form, Formik} from "formik"
import FormField from "@/components/utils/FormField"
import Button from "@/components/utils/Button"
import React, {useEffect, useState} from "react"

const exampleAddresses = [
    {
        id: "1",
        name: "Domicile",
        address: "19 rue de la Lune",
        complete: "batiment 21",
        city: "NY",
    }
    ,
    {
        id: "2",
        name: "Maison parents",
        address: "69 rue de la Lune",
        complete: "batiment 07",
        city: "NY",
    }
]

const defaultValidationSchema = yup.object().shape({
    firstName: yup.string().required().label("Prénom"),
    name: yup.string().required().label("Nom"),
    address: yup.string().required().label("Adresse"),
    complete: yup.string().label("Complément d'adresse"),
    city: yup.string().required().label("Ville"),
})

const defaultInitialValues = {
    firstName: "John",
    name: "Doe",
    address: "",
    complete: "",
    city: "",
}

const Payment = (props) => {
    const [selectedId, setSelectedId] = useState(0)
    const [formValues, setFormValues] = useState(defaultInitialValues)

    const {
        onSubmit,
        initialValues = formValues,
        validationSchema = defaultValidationSchema,
    } = props

    const getCardId = (event) => {
        setSelectedId(event.target.options[event.target.selectedIndex].id)
    }

    useEffect(() => {
        const chosen = selectedId ? exampleAddresses.find(({id}) => id === selectedId) : defaultInitialValues
        setFormValues(prevValues => ({
            ...prevValues,
            address: chosen.address,
            complete: chosen.complete,
            city: chosen.city
        }))
    }, [selectedId])

    return (
        <>
            <Formik
                enableReinitialize
                onSubmit={onSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                <div>
                    <Form>
                        <div className="flex flex-col items-center my-10">
                            <h1 className="font-bold text-xl">Livraison</h1>
                            <div
                                className="grid gap-2 grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 lg:grid-rows-3 space-y-3 w-4/5 lg:w-1/2">
                                <FormField
                                    name="firstName"
                                    label="Prénom"
                                    className="lg:col-span-2"
                                />
                                <FormField
                                    name="name"
                                    label="Nom"
                                    className="lg:col-span-2"
                                />
                                <div className="md:col-span-2 lg:col-span-4 md:w-1/2">
                                    <label htmlFor="addresses"></label>
                                    <select id="addresses"
                                            onChange={getCardId}
                                            className="bg-white border-2 border-gray-400 rounded-lg block w-full px-5 py-2">
                                        <option defaultChecked>Choisir une addresse enregistrée</option>
                                        {
                                            exampleAddresses
                                                .map(address =>
                                                    <option value={address.name}
                                                            id={address.id}
                                                            key={address.id}
                                                    >{address.name}</option>
                                                )
                                        }
                                    </select>
                                </div>
                                <FormField
                                    name="address"
                                    label="Adresse"
                                    className="lg:col-span-2"
                                />
                                <FormField
                                    name="complete"
                                    label="Complément d'adresse"
                                    className="lg:col-span-2"
                                />
                                <FormField
                                    name="city"
                                    label="Ville"
                                    className="lg:col-span-2"
                                />
                            </div>
                            <Button>Passer au paiement</Button>
                        </div>
                    </Form>
                </div>
            </Formik>
        </>
    )
}

export default Payment