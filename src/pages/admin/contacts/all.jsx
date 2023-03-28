import {NavLink} from "@/components/utils/NavLink"
import {PencilSquareIcon, TrashIcon} from "@heroicons/react/24/outline"
import axios from "axios"
import routes from "@/web/routes"

export const getServerSideProps = async () => {
  const {data} = await axios.get(
    `http://localhost:3000/api${routes.api.getContacts()}`
  )

  return {
    props: {
      contacts: data.result,
    },
  }
}

const AllContacts = (props) => {
  const {contacts} = props

  return (
    <div className="p-10 absolute top-10 left-0 z-0 lg:top-0 lg:left-64">
      <h1>Contacts</h1>
      <div
        className="flex flex-col overflow-x-auto overflow-hidden py-2 inline-block min-w-full sm:-mx-6 lg:-mx-8 sm:px-6 lg:px-8">
        <table className="table-auto">
          <thead className="bg-white border-b">
          <tr>
            <th className="text-sm font-medium text-gray-900 p-4 text-left uppercase">
              EMAIL ADDRESS
            </th>
            <th className="text-sm font-medium text-gray-900 p-4 text-left uppercase">
              TOPIC
            </th>
            <th className="text-sm font-medium text-gray-900 p-4 text-left uppercase">
              STATUS
            </th>
            <th>
            </th>
          </tr>
          </thead>
          <tbody>
          {
            contacts.map((contact) => {
              return <tr className="bg-gray-100 border-b"
                         key={contact.id}>
                <td className="p-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <NavLink href={`/admin/categories/${contact.id}/show`}>
                    {contact.mail}
                  </NavLink>
                </td>
                <td className="p-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {contact.topic}
                </td>
                <td className="p-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {
                    contact.status ? "Unread" : "Read"
                  }
                </td>
                <td className="flex flex-row gap-5 text-sm text-gray-900 font-light p-4">
                  <NavLink href={`/admin/categories/${contacts.id}/edit`}>
                    <PencilSquareIcon className="h-6 w-6"/>
                  </NavLink>
                  <NavLink href={`/admin/categories/${contacts.id}/delete`}>
                    <TrashIcon className="h-6 w-6"/>
                  </NavLink>
                </td>
              </tr>
            })
          }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllContacts