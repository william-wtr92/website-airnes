import axios from "axios"
import routes from "@/web/routes"
import DisplayPage from "@/components/app/admin/DisplayPage"
import useAppContext from "@/web/hooks/useAppContext"
import { useCallback } from "react"

export const getServerSideProps = async (context) => {
  const { page } = context.query

  const { data } = await axios.get(
    `http://localhost:3000/api${routes.api.users.getUsers()}?page=${page || 1}`
  )

  return {
    props: {
      users: data.result,
      pagination: data.pagination,
    },
  }
}

const All = (props) => {
  const { users, pagination } = props

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
      columns={["ID", "Name", "Mail", "Role"]}
      fields={["id", "name", "mail", "right"]}
    />
  )
}

export default All
