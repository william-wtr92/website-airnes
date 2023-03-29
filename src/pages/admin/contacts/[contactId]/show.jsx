import Return from "@/components/app/ui/Return"
import axios from "axios"
import routes from "@/web/routes"
import {useRouter} from "next/router"
import useAppContext from "@/web/hooks/useAppContext"

export const getServerSideProps = async (context) => {
  const {contactId} = context.params

  const {data} = await axios.get(
    `http://localhost:3000${routes.api.contactData(contactId)}`
  )

  if (!data.result) {
    return {
      redirect: {
        destination: "/admin/contacts/all",
        permanent: false,
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
  const {contact} = props

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")

    return `${day}/${month}/${year}`
  }

  const {actions: {updateContact}} = useAppContext()

  const router = useRouter()

  const handleClick = () => {
    updateContact({
      contactId: contact.id,
      status: !contact.status,
    })

    router.push("/admin/contacts/all")
  }


  return (
    <div className="p-10 flex flex-col gap-10 absolute top-10 left-0 z-0 lg:top-0 lg:left-64">
      <Return name="contacts" back={"/admin/contacts/all"}/>
      <div>{contact.mail}</div>
      <div>
        {formatDate(contact.createdAt)}
        {contact.updatedAt !== contact.createdAt ? `(Last udpdate: ${formatDate(contact.updatedAt)}` : null}
      </div>
      <div className="font-bold">
        {contact.topic}
      </div>
      <div>
        {contact.content}
      </div>
      <button className="uppercase bg-white text-gray-500 font-bold rounded-full border-2 px-4 py-1" onClick={handleClick}>
        {
          contact.read ? "Open it" : "Mark as read"
        }
      </button>
    </div>
  )
}

export default ShowContact