import { Formik, Form, Field } from "formik"
import Button from "@/components/app/ui/Button"
import { returnValidationSchema } from "@/components/validation/return"
import Image from "next/image"

const ReturnForm = (props) => {
  const { products, onSubmit, t } = props

  const initialValues = {
    products: products.map((product) => ({
      product_id: product.product_id,
      selected: Boolean(product.return),
      reason: product.return || ""
    }))
  }

  return (
    <div className="w-full px-5 md:w-3/4 lg:w-1/2 flex flex-col gap-10">
      <Formik
        initialValues={initialValues}
        validationSchema={returnValidationSchema}
        onSubmit={onSubmit}
      >
        {({ values }) => (
          <Form className="flex flex-col gap-5">
            {values.products.map((product, index) => (
              <div key={index} className="flex flex-col gap-5">
                <div className="flex gap-5">
                  <Field
                    name={`products[${index}].selected`}
                    type="checkbox"
                    id={`checkbox-${index}`}
                    className="h-4 w-4 appearance-none hover:cursor-pointer border-2 checked:bg-primary duration-500"
                    disabled={initialValues.products[index].reason}
                  />
                  <label htmlFor={`checkbox-${index}`}>
                    <Image
                      src={products[index].productData.image[0].url}
                      alt={products[index].productData.name}
                      width={100}
                      height={100}
                      className="h-28 w-28 object-cover"
                    />
                  </label>
                  <div className="flex flex-col gap-5">
                    <div className="text-xl">{products[index].productData.name}</div>
                    <div className="text-lg">{products[index].productData.price} €</div>
                  </div>
                </div>
                {values.products[index].selected && (
                  <Field
                    name={`products[${index}].reason`}
                    type="text"
                    rows="4"
                    placeholder={t("reasonPlaceholder")}
                    className="border rounded-md p-2"
                    required={product.selected}
                    disabled={initialValues.products[index].reason}
                  />
                )}
              </div>
            ))}
            <Button type="submit" className="mt-10">
              {t("submitReturn")}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ReturnForm
