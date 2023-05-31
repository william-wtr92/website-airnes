import DisplayPage from "@/components/app/admin/DisplayPage"
import useAppContext from "@/web/hooks/useAppContext"
import { useCallback } from "react"
import getApi from "@/web/getAPI"
import { getAuthorization } from "@/web/helper/getAuthorization"
import getProductsServices from "@/web/services/admin/products/getProducts"
import AdminErrorMessage from "@/components/utils/AdminErrorMessage"

export const getServerSideProps = async (context) => {
  const redirect = getAuthorization("admin", context.req)

  if (redirect) {
    return redirect
  }

  const { page, order, column } = context.query

  const api = getApi(context)

  const clearPage = page || 1
  const clearOrder = order || "asc"
  const clearColumn = column || "id"

  const getProducts = getProductsServices({ api })
  const [err, data] = await getProducts(clearPage, clearOrder, clearColumn)

  if (err) {
    return {
      props: {
        errorMessage: err,
      },
    }
  }

  return {
    props: {
      products: data.result,
      pagination: data.pagination,
      query: { clearPage, clearOrder, clearColumn },
    },
  }
}

const AllProducts = (props) => {
  const { products, pagination, query, errorMessage } = props

  const {
    actions: { deleteProduct },
  } = useAppContext()

  const handleDelete = useCallback(
    async (id) => {
      await deleteProduct(id)

      window.location.reload()
    },
    [deleteProduct]
  )

  return (
    <>
      {errorMessage ? (
        <AdminErrorMessage errorMessage={errorMessage} />
      ) : (
        <DisplayPage
          sections={"products"}
          section={"products"}
          items={products}
          pagination={pagination}
          canAdd={true}
          canEdit={true}
          deleteRoute={handleDelete}
          columns={["id", "name", "category", "price", "quantity"]}
          fields={["id", "name", "categoryId", "price", "quantity"]}
          query={query}
        />
      )}
    </>
  )
}

export default AllProducts
