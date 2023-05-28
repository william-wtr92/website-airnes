import DisplayPage from "@/components/app/admin/DisplayPage"
import { useCallback } from "react"
import useAppContext from "@/web/hooks/useAppContext"
import getApi from "@/web/getAPI"
import { getAuthorization } from "@/web/helper/getAuthorization"
import getContactsServices from "@/web/services/admin/contacts/getContacts"
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

  const getContacts = getContactsServices({ api })

  const [err, data] = await getContacts(clearPage, clearOrder, clearColumn)

  if (err) {
    return {
      props: {
        errorMessage: err,
      },
    }
  }

  return {
    props: {
      contacts: data.result,
      pagination: data.pagination,
      query: { clearPage, clearOrder, clearColumn },
    },
  }
}

const AllContacts = (props) => {
  const { contacts, pagination, query, errorMessage } = props

  const {
    actions: { deleteContact },
  } = useAppContext()

  const handleDelete = useCallback(
    async (id) => {
      await deleteContact(id)

      window.location.reload()
    },
    [deleteContact]
  )

  return (
    <>
      {errorMessage ? (
        <AdminErrorMessage errorMessage={errorMessage} />
      ) : (
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
      )}
    </>
  )
}

export default AllContacts
