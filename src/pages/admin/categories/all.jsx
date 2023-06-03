import DisplayPage from "@/components/app/admin/DisplayPage"
import useAppContext from "@/web/hooks/useAppContext"
import { useCallback } from "react"
import getApi from "@/web/getAPI"
import { getAuthorization } from "@/web/helper/getAuthorization"
import getCategoriesServices from "@/web/services/admin/categories/getCategories"
import AdminErrorMessage from "@/components/utils/AdminErrorMessage"

export const getServerSideProps = async (context) => {
  const redirect = getAuthorization("admin", context.req)

  if (redirect) {
    return redirect
  }

  const { page, order, column } = context.query

  const clearPage = page || 1
  const clearOrder = order || "asc"
  const clearColumn = column || "id"

  const api = getApi(context)

  const getCategories = getCategoriesServices({ api })
  const [err, data] = await getCategories(clearPage, clearOrder, clearColumn)

  if (err) {
    return {
      props: {
        errorMessage: err,
      },
    }
  }

  return {
    props: {
      categories: data.result,
      pagination: data.pagination,
      query: { clearPage, clearOrder, clearColumn },
    },
  }
}

const AllCategories = (props) => {
  const { categories, pagination, query, errorMessage } = props

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
    <>
      {errorMessage ? (
        <AdminErrorMessage errorMessage={errorMessage} />
      ) : (
        <DisplayPage
          sections={"categories"}
          section={"category"}
          items={categories}
          pagination={pagination}
          canAdd={true}
          canEdit={true}
          deleteRoute={handleDelete}
          columns={["id", "name"]}
          fields={["id", "name"]}
          query={query}
        />
      )}
    </>
  )
}

export default AllCategories
