import {
  selectedProductInitialValues,
  selectedProductValidationSchema,
} from "@/components/validation/admin/product"
import { useRouter } from "next/router"
import SelectedForm from "@/components/app/admin/SelectedForm"
import { useCallback, useEffect, useState } from "react"
import useAppContext from "@/web/hooks/useAppContext"
import getApi from "@/web/getAPI"
import { getAuthorization } from "@/web/helper/getAuthorization"
import getSelectProductsServices from "@/web/services/admin/homepage/getSelectProducts"
import getProductsServices from "@/web/services/admin/homepage/getProducts"
import AdminErrorMessage from "@/components/utils/AdminErrorMessage"

export const getServerSideProps = async (context) => {
  const redirect = getAuthorization("admin", context.req)

  if (redirect) {
    return redirect
  }

  const api = getApi(context)

  const getProducts = getProductsServices({ api })
  const getSelectProducts = getSelectProductsServices({ api })

  const [errAllProducts, allProducts] = await getProducts()
  const [errSelectedProducts, selectedProducts] = await getSelectProducts()

  const isEmpty = allProducts.result.length === 0

  if (isEmpty) {
    return {
      redirect: {
        destination: "/admin/homepage",
      },
    }
  }

  if (errAllProducts && errSelectedProducts) {
    return {
      props: {
        errorMessage: errAllProducts + " & " + errSelectedProducts,
      },
    }
  }

  if (errAllProducts || errSelectedProducts) {
    return {
      props: {
        errorMessage: errAllProducts || errSelectedProducts,
      },
    }
  }

  return {
    props: {
      allProducts: allProducts.result,
      selectedProducts: selectedProducts.result,
    },
  }
}

const AddSelectedProduct = (props) => {
  const { allProducts, selectedProducts, errorMessage } = props

  const [error, setError] = useState(null)

  const router = useRouter()

  const [products, setProducts] = useState([])

  useEffect(() => {
    const selectedProductsIds = new Set(
      selectedProducts.map((item) => item.product_id)
    )
    const unselectedProducts = allProducts.filter(
      (product) => !selectedProductsIds.has(product.id)
    )

    const options = unselectedProducts.map((item) => ({
      value: item.id,
      label: item.name,
    }))

    setProducts(options)
  }, [selectedProducts, allProducts])

  const {
    actions: { addSelectedProduct },
  } = useAppContext()

  const handlePostProduct = useCallback(
    async (values) => {
      setError(null)

      const [err] = await addSelectedProduct({ productId: values.products })

      if (err) {
        setError(err)

        return
      }

      router.push("/admin/homepage")
    },
    [addSelectedProduct, router]
  )

  return (
    <>
      {errorMessage ? (
        <AdminErrorMessage errorMessage={errorMessage} />
      ) : (
        <>
          {error && <p>{error}</p>}
          <SelectedForm
            initialValues={selectedProductInitialValues}
            validationSchema={selectedProductValidationSchema}
            onSubmit={handlePostProduct}
            selectOptions={products}
            formType="products"
          />
        </>
      )}
    </>
  )
}

export default AddSelectedProduct
