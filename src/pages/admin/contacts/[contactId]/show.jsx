import Return from "@/components/app/ui/Return"
import { useRouter } from "next/router"
import useAppContext from "@/web/hooks/useAppContext"
import getApi from "@/web/getAPI"
import { getAuthorization } from "@/web/helper/getAuthorization"
import contactDataServices from "@/web/services/admin/contacts/contactData"
import AdminErrorMessage from "@/components/utils/AdminErrorMessage"

export const getServerSideProps = async (context) => {
  const redirect = getAuthorization("admin", context.req)

  if (redirect) {
    return redirect
  }

  const { contactId } = context.params

  const api = getApi(context)
  const contactData = contactDataServices({ api })

  const [err, data] = await contactData(contactId)

  if (err) {
    return {
      props: {
        errorMessage: err,
      },
    }
  }

  return {
    props: {
      contact: data.result,
    },
  }
}

const ShowContact = (props) => {
  const { contact, errorMessage } = props

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")

    return `${day}/${month}/${year}`
  }

  const {
    actions: { updateContact },
  } = useAppContext()

  const router = useRouter()

  const handleClick = () => {
    updateContact({
      contactId: contact.id,
      status: !contact.status,
    })

    router.push("/admin/contacts/all")
  }

  return (
    <>
      {errorMessage ? (
        <AdminErrorMessage errorMessage={errorMessage} />
      ) : (
        <div className="p-10 flex flex-col gap-10 absolute top-10 left-0 z-0 lg:top-0 lg:left-64">
          <Return name="contacts" back={"/admin/contacts/all"} />
          <div>{contact.mail}</div>
          <div>
            {formatDate(contact.createdAt)}
            {contact.updatedAt !== contact.createdAt
              ? `(Last udpdate: ${formatDate(contact.updatedAt)}`
              : null}
          </div>
          <div className="font-bold">{contact.topic}</div>
          <div>{contact.content}</div>
          <button
            className="uppercase bg-white text-gray-500 font-bold rounded-full border-2 px-4 py-1"
            onClick={handleClick}
          >
            {contact.read ? "Mark it as new" : "Mark it as open"}
          </button>
        </div>
      )}
    </>
  )
}

export default ShowContact
