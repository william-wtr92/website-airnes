import { NavLink } from "@/components/utils/NavLink"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"
import classNames from "classnames"
import Confirm from "@/components/app/ui/Confirm"
import { useCallback, useState } from "react"

const Table = (props) => {
  const { section, columns, contents, canEdit, deleteRoute, fields } = props

  const [itemToDelete, setItemToDelete] = useState(null)

  const onDeleteClick = (id) => {
    setItemToDelete(id)
  }

  const handleDeletion = useCallback(
    async (id) => {
      await deleteRoute(id)
      setItemToDelete(null)
    },
    [deleteRoute]
  )

  const renderFieldContent = (field, content, section) => {
    if (field === "name" || field === "topic") {
      return (
        <NavLink href={`/admin/${section}/${content.id}/show`}>
          {content[field]}
        </NavLink>
      )
    }

    if (field === "read") {
      return content[field] ? "Opened" : "New"
    }

    return content[field]
  }

  return (
    <table className="table-auto">
      <Confirm
        className={classNames(itemToDelete ? "block" : "hidden")}
        display={setItemToDelete}
        action={handleDeletion}
        textValue="Are you sure you want to delete this item?"
        params={itemToDelete}
      />
      <thead className="bg-white border-b">
        <tr>
          {columns.map((column) => {
            return (
              <th
                className="text-sm font-medium text-gray-900 p-4 text-left uppercase"
                key={column}
              >
                {column}
              </th>
            )
          })}
          <th className="opacity-0">Actions</th>
        </tr>
      </thead>
      <tbody>
        {contents.map((content) => {
          return (
            <tr className="border-b" key={content.id}>
              {fields.map((field) => {
                return (
                  <td
                    className="p-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    key={`${content.id}-${field}`}
                  >
                    {renderFieldContent(field, content, section)}
                  </td>
                )
              })}
              <td className="flex flex-row gap-5 text-sm text-gray-900 font-light py-4">
                {canEdit ? (
                  <NavLink href={`/admin/${section}/${content.id}/edit`}>
                    <PencilSquareIcon className="h-6 w-6" />
                  </NavLink>
                ) : null}
                {deleteRoute && (
                  <>
                    <TrashIcon
                      className="h-6 w-6"
                      onClick={() => onDeleteClick(content.id)}
                    />
                  </>
                )}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
