import {
  productInitialValues,
  productValidationSchema,
} from "@/components/validation/admin/product"
import { useRouter } from "next/router"
import ProductForm from "@/components/app/admin/ProductForm"
import { useCallback, useState } from "react"
import useAppContext from "@/web/hooks/useAppContext"
import getApi from "@/web/getAPI"
import { getAuthorization } from "@/web/helper/getAuthorization"
import getMaterialsAndCategoryServices from "@/web/services/admin/materials/getMaterialsAndCategory"
import AdminErrorMessage from "@/components/utils/AdminErrorMessage"

export const getServerSideProps = async (context) => {
  const redirect = getAuthorization("admin", context.req)

  if (redirect) {
    return redirect
  }

  const api = getApi(context)

  const getMaterialsAndCategory = getMaterialsAndCategoryServices({ api })
  const [err, data] = await getMaterialsAndCategory()

  if (err) {
    return {
      props: {
        errorMessage: err,
      },
    }
  }

  return {
    props: {
      categories: data.categories,
      materials: data.materials,
    },
  }
}
const CreateProduct = (props) => {
  const { categories, materials, errorMessage } = props
  const [error, setError] = useState(null)
  const router = useRouter()

  const {
    actions: { addProduct },
  } = useAppContext()

  const handlePost = useCallback(
    async (values) => {
      setError(null)

      const [err] = await addProduct(values)

      if (err) {
        setError(err)

        return
      }

      router.push("/admin/products/all")
    },
    [addProduct, router]
  )

  return (
    <>
      {errorMessage ? (
        <AdminErrorMessage errorMessage={errorMessage} />
      ) : (
        <ProductForm
          initialValues={productInitialValues}
          validationSchema={productValidationSchema}
          onSubmit={handlePost}
          categories={categories}
          materials={materials}
          error={error}
        />
      )}
    </>
  )
}

export default CreateProduct
