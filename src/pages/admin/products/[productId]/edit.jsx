import routes from "@/web/routes"
import { useRouter } from "next/router"
import useAppContext from "@/web/hooks/useAppContext"
import {useCallback, useState} from "react"
import {
    editProductValidationSchema,
} from "@/components/validation/admin/product"
import ProductForm from "@/components/app/admin/ProductForm"

export const getServerSideProps = async (context) => {
  const { productId } = context.params

  const [productRes, materialsAndCategoriesRes] = await Promise.all([
        fetch( `http://localhost:3000${routes.api.productData(productId)}`),
        fetch(`http://localhost:3000/api${routes.api.getMaterialsAndCategory()}`)
      ]
  )

  const [product, materialsAndCategories]= await Promise.all([
    productRes.json(),
      materialsAndCategoriesRes.json()
  ])


  return {
    props: {
      product: product.result,
      categories: materialsAndCategories.categories,
      materials: materialsAndCategories.materials
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

export default EditProduct
