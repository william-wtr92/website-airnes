import Return from "@/components/app/ui/Return"
import {Field, Form, Formik} from "formik"
import FormField from "@/components/utils/FormField"
import Button from "@/components/app/ui/Button"
import React from "react"
import {ImagesInput} from "@/components/utils/ImagesInputField"

const ProductForm = (props) => {
  const { initialValues, validationSchema, onSubmit, categories, materials, error } = props

  const defaultValueCategory = categories.find(({ id }) => id === initialValues.categoryId)
  const filteredEditDefaultCategories = categories.filter((item) => item.id !== initialValues.categoryId)
  const defaultValueMaterial = materials.find(({ id }) => id === initialValues.materialId)
  const filteredEditDefaultMaterials = materials.filter((item) => item.id !== initialValues.materialId)

  const initialCategories = initialValues.categoryId ? filteredEditDefaultCategories : categories
  const initialMaterials = initialValues.materialId ? filteredEditDefaultMaterials : materials

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
           <ImagesInput />
            <span className="text-md font-semibold">Category</span>
            <Field as="select"
                   name={initialValues.categoryId && initialValues.categoryId !== 0 ? "categoryId" : "category"}
                   className="flex border-2 rounded-md border-gray-400 py-1 cursor-pointer">
              {initialValues.categoryId && initialValues.categoryId !== 0 ?
                  <option defaultChecked value={initialValues.categoryId}
                          id={initialValues.categoryId}
                          key={initialValues.categoryId}
                  >{defaultValueCategory.name}</option> :
                  <option defaultChecked>Select a Category</option>}
              {
                initialCategories
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
            <span className="text-md font-semibold">Material</span>
            <Field as="select" name={initialValues.materialId ? "materialId" : "material"}
                   className="flex border-2 rounded-md border-gray-400 py-1 cursor-pointer">
              {initialValues.materialId ?
                  <option defaultChecked value={initialValues.materialId}
                          id={initialValues.materialId}
                          key={initialValues.materialId}>{defaultValueMaterial.name}</option> :
                  <option defaultChecked>Select a Material</option>}
              {
                initialMaterials
                    .map(material =>
                        <option value={material.id}
                                id={material.id}
                                key={material.id}
                        >{material.name}</option>
                    )
              }
            </Field>
            <Button type="submit" className="mt-10 ">Save</Button>
          </Form>
        </Formik>
      </div>
  )
}

export default ProductForm