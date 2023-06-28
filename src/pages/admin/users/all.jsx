import DisplayPage from "@/components/app/admin/DisplayPage"
import useAppContext from "@/web/hooks/useAppContext"
import { useCallback } from "react"
import getApi from "@/web/getAPI"
import { getAuthorization } from "@/web/helper/getAuthorization"
import getUsersServices from "@/web/services/admin/users/getUsers"
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
  const clearColumn = (column === "right" ? "roleid" : column) || "id"

  const getUsers = getUsersServices({ api })

  const [err, data] = await getUsers(clearPage, clearOrder, clearColumn)

  if (err) {
    return {
      props: {
        errorMessage: err,
      },
    }
  }

  return {
    props: {
      users: data.result,
      pagination: data.pagination,
      query: { clearPage, clearOrder, clearColumn },
    },
  }
}

const AllUsers = (props) => {
  const { users, pagination, query, errorMessage } = props

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
    <>
      {errorMessage ? (
        <AdminErrorMessage errorMessage={errorMessage} />
      ) : (
        <DisplayPage
          sections={"users"}
          items={users}
          pagination={pagination}
          canAdd={false}
          canEdit={true}
          deleteRoute={handleDelete}
          columns={["id", "Name", "Mail", "disabled", "Right"]}
          fields={["id", "name", "mail", "disabled", "right"]}
          query={query}
        />
      )}
    </>
  )
}

export default AllUsers
