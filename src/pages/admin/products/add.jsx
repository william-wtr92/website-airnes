import {
  selectedProductInitialValues,
  selectedProductValidationSchema
} from "@/components/validation/admin/product"
import {useRouter} from "next/router"
import SelectedForm from "@/components/app/admin/SelectedForm"
import {useCallback, useEffect, useState} from "react"
import useAppContext from "@/web/hooks/useAppContext"
import routes from "@/web/routes"
import getApi from "@/web/getAPI"

export const getServerSideProps = async (context) => {
  const { page } = context.query

  const api = getApi(context)

  const allProducts = await api.get(
    routes.api.admin.products.getProducts()
  )

  const selectedProducts = await api.get(
    routes.api.admin.selectProduct.getSelectProducts()
  )

  const isEmpty = allProducts.data.result.length === 0

  if (isEmpty && page !== "1") {
    return {
      redirect: {
        destination: "/admin/homepage"
      }
    }
  }

  return {
    props: {
      allProducts: allProducts.data.result,
      selectedProducts: selectedProducts.data.result
    }
  }
}

const AddSelectedProduct = (props) => {
  const { allProducts, selectedProducts } = props

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
      label: item.name
    }))

    setProducts(options)
  }, [selectedProducts, allProducts])

  const {
    actions: { addSelectedProduct }
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
      {error && <p>{error}</p>}
      <SelectedForm
        initialValues={selectedProductInitialValues}
        validationSchema={selectedProductValidationSchema}
        onSubmit={handlePostProduct}
        selectOptions={products}
        formType="products"
      />
    </>
  )
}

export default AddSelectedProduct
