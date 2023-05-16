import routes from "@/web/routes"
import DisplayPage from "@/components/app/admin/DisplayPage"
import useAppContext from "@/web/hooks/useAppContext"
import { useCallback } from "react"
import getApi from "@/web/getAPI"

export const getServerSideProps = async (context) => {
  const { page, order, column } = context.query

  const clearPage = page || 1
  const clearOrder = order || "asc"
  const clearColumn = column || "id"

  const api = getApi(context)

  const { data } = await api.get(routes.api.admin.categories.getCategories(), {
    params: {
      page: clearPage,
      order: clearOrder,
      col: clearColumn,
    },
  })

  return {
    props: {
      categories: data.result,
      pagination: data.pagination,
      query: { clearPage, clearOrder, clearColumn },
    },
  }
}

const All = (props) => {
  const { categories, pagination, query } = props

  const {
    actions: { deleteCategory },
  } = useAppContext()

  const handleDelete = useCallback(
    async (id) => {
      await deleteCategory(id)

      window.location.reload()
    },
    [deleteCategory]
  )

  return (
    <DisplayPage
      sections={"categories"}
      section={"category"}
      items={categories}
      pagination={pagination}
      canAdd={true}
      canEdit={true}
      canDelete={true}
      deleteRoute={handleDelete}
      columns={["id", "name"]}
      fields={["id", "name"]}
      query={query}
    />
  )
}

export default All
