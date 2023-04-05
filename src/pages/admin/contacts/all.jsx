import axios from "axios"
import routes from "@/web/routes"
import DisplayPage from "@/components/app/admin/DisplayPage"
import { useCallback } from "react"
import useAppContext from "@/web/hooks/useAppContext"

export const getServerSideProps = async (context) => {
  const { page } = context.query

  const { data } = await axios.get(
    `http://localhost:3000/api${routes.api.getContacts()}?page=${page || 1}`
  )

  return {
    props: {
      contacts: data.result,
      pagination: data.pagination,
    },
  }
}

const AllContacts = (props) => {
  const {
    actions: { deleteContact },
  } = useAppContext()

  const { contacts, pagination } = props

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
    />
  )
}

export default AllContacts
