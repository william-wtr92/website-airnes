import Return from "@/components/app/ui/Return"
import {Field, Form, Formik} from "formik"
import FormField from "@/components/utils/FormField"
import Button from "@/components/app/ui/Button"
import React, {useState} from "react"

const ProductForm = (props) => {
    const {initialValues, validationSchema, onSubmit, categories, materials ,error} = props

    const [showMaterial, setShowMaterial] = useState(false)
    const [showMaterial2, setShowMaterial2] = useState(false)
    const [selectedMaterialValue, setSelectedMaterialValue] = useState("")
    const [selectedMaterial2Value, setSelectedMaterial2Value] = useState("")
    const [materials2 , setMaterials2] = useState([])
    const [materials3 , setMaterials3] = useState([])

    const handleMaterialChange = (event) => {
        const updatedMaterials = materials.filter(material => material.id !== parseInt(event.target.value))
        setSelectedMaterialValue(event.target.value)
        setShowMaterial(true)
        setMaterials2(updatedMaterials)
        console.log(event.target.value)
    }

    const handleMaterial2Change = (event) => {
        const updatedMaterials = materials2.filter(material => material.id !== parseInt(event.target.value))
        setSelectedMaterial2Value(event.target.value)
        setShowMaterial2(true)
        setMaterials3(updatedMaterials)
        console.log(event.target.value)
    }


    return (
        <div className="p-10 flex flex-col gap-10 absolute top-10 left-0 z-0 lg:top-0 lg:left-64">
            <Return name="products" back={"/admin/products/all"}/>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                error={error}
            >
                <Form className="flex flex-col gap-5">
                    <FormField
                        type="text"
                        name="image"
                        placeholder="Enter the image link"
                        label="Image"
                        className="w-96"
                    />
                    <Field as="select" name="category" >
                        {
                            categories
                                .map(category =>
                                    <option value={category.id}
                                            id={category.id}
                                            key={category.id}
                                    >{category.name}</option>
                                )
                        }
                    </Field>
                    <FormField
                        type="text"
                        name="name"
                        placeholder="Enter the category's name"
                        label="Name"
                    />
                    <FormField
                        type="number"
                        name="price"
                        label="Price"
                    />
                    <FormField
                        type="number"
                        name="promotion"
                        label="Promotion"
                    />
                    <FormField
                        type="number"
                        name="quantity"
                        label="Quantity"
                    />
                    <FormField
                        type="text"
                        tag="textarea"
                        name="description"
                        placeholder="Enter the product's description"
                        label="Description"
                    />
                    <Field as="select" name="material"  onChange={handleMaterialChange} value={selectedMaterialValue}>
                        {
                            materials
                                .map(category =>
                                    <option value={category.id}
                                            id={category.id}
                                            key={category.id}
                                    >{category.name}</option>
                                )
                        }
                    </Field>
                        {showMaterial && (
                            <Field as="select" name="material2"  onChange={handleMaterial2Change} value={selectedMaterial2Value}>
                                {
                                    materials2
                                        .map(category =>
                                            <option value={category.id}
                                                    id={category.id}
                                                    key={category.id}
                                            >{category.name}</option>
                                        )
                                }
                            </Field>
                        )}

                        {showMaterial2 && (
                            <Field as="select" name="material3" >
                                {
                                    materials3
                                        .map(category =>
                                            <option value={category.id}
                                                    id={category.id}
                                                    key={category.id}
                                            >{category.name}</option>
                                        )
                                }
                            </Field>
                        )}
                    <Button type="submit" className="mt-10 bg-white">Save</Button>
                </Form>
            </Formik>
        </div>
    )
}

export default ProductForm