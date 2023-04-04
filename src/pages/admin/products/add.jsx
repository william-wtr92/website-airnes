import {
  selectedProductInitialValues,
  selectedProductValidationSchema,
} from "@/components/validation/admin/product"
import { useRouter } from "next/router"
import SelectedForm from "@/components/app/admin/SelectedForm"
import { useCallback, useEffect, useState } from "react"
import useAppContext from "@/web/hooks/useAppContext"
import routes from "@/web/routes"
import axios from "axios"

export const getServerSideProps = async (context) => {
  const { page } = context.query

  const redirectToInitial = () => {
    return {
      redirect: {
        destination: "/admin/homepage?page=1",
        permanent: false,
      },
    }
  }

  try {
    const [allProducts, selectProducts] = await Promise.all([
      axios.get(`http://localhost:3000/api${routes.api.getProducts()}`),

      axios.get(
        `http://localhost:3000/api${routes.api.selectProduct.getSelectProducts()}`
      ),
    ])

    const isEmpty = allProducts.data.result.length === 0

    if (isEmpty && page !== "1") {
      return redirectToInitial()
    }

    // console.log(allProducts.data.result)
    // console.log(selectProducts.data.result)

    return {
      props: {
        allProducts: allProducts.data.result,
        selectProducts: selectProducts.data.result,
      },
    }
  } catch (error) {
    return redirectToInitial()
  }
}

const AddSelectedProduct = (props) => {
  const { allProducts, selectProducts } = props

  const [error, setError] = useState(null)

  const router = useRouter()

  const [products, setProducts] = useState([])

  useEffect(() => {
    const selectedProductsIds = new Set(
      selectProducts.map((item) => item.product_id)
    )
    const unselectedProducts = allProducts.filter(
      (product) => !selectedProductsIds.has(product.id)
    )

    const options = unselectedProducts.map((item) => ({
      value: item.id,
      label: item.name,
    }))

    setProducts(options)
  }, [selectProducts, allProducts])

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
