import routes from "@/web/routes"
import DisplayPage from "@/components/app/admin/DisplayPage"
import useAppContext from "@/web/hooks/useAppContext"
import { useCallback } from "react"
import getApi from "@/web/getAPI"

export const getServerSideProps = async (context) => {
  const { page, order, column } = context.query

  const api = getApi(context)

  const clearPage = page || 1
  const clearOrder = order || "asc"
  const clearColumn = (column === "right" ? "roleid" : column) || "id"

  const { data } = await api.get(routes.api.admin.users.getUsers(), {
    params: {
      page: clearPage,
      order: clearOrder,
      col: clearColumn,
    }
  })

  return {
    props: {
      users: data.result,
      pagination: data.pagination,
      query: { clearPage, clearOrder, clearColumn },
    },
  }
}

const All = (props) => {
  const { users, pagination, query } = props

  const {
    actions: { deleteUser },
  } = useAppContext()

  const handleDelete = useCallback(
    async (id) => {
      await deleteUser(id)

      window.location.reload()
    },
    [deleteUser]
  )

  return (
    <DisplayPage
      sections={"users"}
      items={users}
      pagination={pagination}
      canAdd={false}
      canEdit={true}
      deleteRoute={handleDelete}
      columns={["id", "Name", "Mail", "Right"]}
      fields={["id", "name", "mail", "right"]}
      query={query}
    />
  )
}

export default All
