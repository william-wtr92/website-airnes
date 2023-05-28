import { useRouter } from "next/router"
import useAppContext from "@/web/hooks/useAppContext"
import { useCallback, useState } from "react"
import { editProductValidationSchema } from "@/components/validation/admin/product"
import ProductForm from "@/components/app/admin/ProductForm"
import getApi from "@/web/getAPI"
import { getAuthorization } from "@/web/helper/getAuthorization"
import getMaterialsAndCategoryServices from "@/web/services/admin/materials/getMaterialsAndCategory"
import productDataServices from "@/web/services/admin/products/productData"
import AdminErrorMessage from "@/components/utils/AdminErrorMessage"

export const getServerSideProps = async (context) => {
  const redirect = getAuthorization("admin", context.req)

  if (redirect) {
    return redirect
  }

  const { productId } = context.params

  const api = getApi(context)

  const productData = productDataServices({ api })
  const getMaterialsAndCategory = getMaterialsAndCategoryServices({ api })

  const [errProduct, product] = await productData(productId)

  const [errRaterialsAndCategories, materialsAndCategories] =
    await getMaterialsAndCategory()

  if (errProduct && errRaterialsAndCategories) {
    return {
      props: {
        errorMessage: errProduct + " & " + errRaterialsAndCategories,
      },
    }
  }

  if (errProduct || errRaterialsAndCategories) {
    return {
      props: {
        errorMessage: errProduct || errRaterialsAndCategories,
      },
    }
  }

  return {
    props: {
      product: product.result,
      categories: materialsAndCategories.categories,
      materials: materialsAndCategories.materials,
    },
  }
}

const EditProduct = (props) => {
  const { product, categories, materials, errorMessage } = props

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
    <>
      {errorMessage ? (
        <AdminErrorMessage errorMessage={errorMessage} />
      ) : (
        <ProductForm
          initialValues={productInitialValues}
          validationSchema={editProductValidationSchema}
          onSubmit={handlePost}
          categories={categories}
          materials={materials}
          error={error}
        />
      )}
    </>
  )
}

export default EditProduct
