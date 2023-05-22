import routes from "@/web/routes"
import { useRouter } from "next/router"
import useAppContext from "@/web/hooks/useAppContext"
import { useCallback, useState } from "react"
import { editProductValidationSchema } from "@/components/validation/admin/product"
import ProductForm from "@/components/app/admin/ProductForm"
import getApi from "@/web/getAPI"

export const getServerSideProps = async (context) => {
  const { productId } = context.params

  const api = getApi(context)

  const productRes = await api.get(
    routes.api.admin.products.productData(productId)
  )

  const materialsAndCategoriesRes = await api.get(
    routes.api.admin.materials.getMaterialsAndCategory()
  )

  const product = await productRes.json()
  const materialsAndCategories = await materialsAndCategoriesRes.json()

  return {
    props: {
      product: product.result,
      categories: materialsAndCategories.categories,
      materials: materialsAndCategories.materials,
    },
  }
}

const EditProduct = (props) => {
  const { product, categories, materials } = props

  const productInitialValues = product
  const [error, setError] = useState(null)

  const router = useRouter()

  const {
    actions: { updateProduct },
  } = useAppContext()

  const handlePost = useCallback(
    async (values) => {
      setError(null)

      const [err] = await updateProduct({ ...values, productId: product.id })

      if (err) {
        setError(err)

        return
      }

      router.push("/admin/products/all")
    },
    [updateProduct, router, product.id]
  )

  return (
    <ProductForm
      initialValues={productInitialValues}
      validationSchema={editProductValidationSchema}
      onSubmit={handlePost}
      categories={categories}
      materials={materials}
      error={error}
    />
  )
}

EditProduct.restrictedTo = "admin"

export default EditProduct
