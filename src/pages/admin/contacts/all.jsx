import axios from "axios"
import routes from "@/web/routes"
import DisplayPage from "@/components/app/admin/DisplayPage"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"

const AllContacts = () => {
  const [contacts, setContacts] = useState([])
  const [pagination, setPagination] = useState({})
  const router = useRouter()
  const { page } = router.query

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:3000/api${routes.api.getContacts()}?page=${page || 1}`
      )
      setContacts(data.result)
      setPagination(data.pagination)
    }

    fetchData()
  }, [page])

  const handleDelete = async (id) => {
    await axios.delete(
      `http://localhost:3000/api${routes.api.deleteContact(id)}`
    )

    await router.push("/admin/contacts/all")
  }

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
