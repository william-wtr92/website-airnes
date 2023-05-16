import routes from "@/web/routes"
import DisplayPage from "@/components/app/admin/DisplayPage"
import useAppContext from "@/web/hooks/useAppContext"
import {useCallback} from "react"
import getApi from "@/web/getAPI"

export const getServerSideProps = async (context) => {
  const { page, order, column } = context.query

  const api = getApi(context)

  const clearPage = page || 1
  const clearOrder = order || "asc"
  const clearColumn = column || "id"

  const { data } = await api.get(
    routes.api.admin.products.getProducts(), {
      params: {
        page: clearPage,
        order: clearOrder,
        col: clearColumn
      }
    })

  return {
    props: {
      products: data.result,
      pagination: data.pagination,
      query: { clearPage, clearOrder, clearColumn }
    }
  }
}

const All = (props) => {
  const { products, pagination, query } = props

  const {
    actions: { deleteProduct }
  } = useAppContext()

  const handleDelete = useCallback(
    async (id) => {
      await deleteProduct(id)

      window.location.reload()
    },
    [deleteProduct]
  )

  return (
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
  )
}

export default All
