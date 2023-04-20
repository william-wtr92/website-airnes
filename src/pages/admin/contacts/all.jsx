import axios from "axios"
import routes from "@/web/routes"
import DisplayPage from "@/components/app/admin/DisplayPage"
import { useCallback } from "react"
import useAppContext from "@/web/hooks/useAppContext"

export const getServerSideProps = async (context) => {
  const { page, order, column } = context.query
  const clearPage = page || 1
  const clearOrder = order || "asc"
  const clearColumn = column || "id"

  const { data } = await axios.get(
    `http://localhost:3000/api${routes.api.admin.contacts.getContacts()}?page=${clearPage}&order=${clearOrder}&col=${clearColumn}`
  )

  return {
    props: {
      contacts: data.result,
      pagination: data.pagination,
      query: { clearPage, clearOrder, clearColumn },
    },
  }
}

const AllContacts = (props) => {
  const {
    actions: { deleteContact },
  } = useAppContext()

  const { contacts, pagination, query } = props

  const handleDelete = useCallback(
    async (id) => {
      await deleteContact(id)

      window.location.reload()
    },
    [deleteContact]
  )

  return (
    <DisplayPage
      sections={"contacts"}
      section={"contact"}
      items={contacts}
      pagination={pagination}
      canAdd={false}
      canEdit={false}
      deleteRoute={handleDelete}
      columns={["id", "topic", "state"]}
      fields={["id", "topic", "read"]}
      query={query}
    />
  )
}

export default AllContacts
