import {NavLink} from "@/components/utils/NavLink"
import {PencilSquareIcon, TrashIcon} from "@heroicons/react/24/outline"
import classNames from "classnames"
import Confirm from "@/components/app/ui/Confirm"
import {useCallback, useState} from "react"
import {useRouter} from "next/router"
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/24/solid"

const Table = (props) => {
  const {
    section,
    columns,
    contents,
    canEdit,
    deleteRoute,
    fields,
    page,
    lastorder,
  } = props

  const [itemToDelete, setItemToDelete] = useState(false)
  const [lastcolumn, setLastcolumn] = useState("id")
  const [order, setOrder] = useState(lastorder)

  const isNoCategory = (content) => {
    return section === "categories" && content.name === "No category"
  }

  const onDeleteClick = (id) => {
    setItemToDelete(id)
  }

  const handleDeletion = useCallback(
    async (id) => {
      await deleteRoute(id)
      setItemToDelete(false)
    },
    [deleteRoute]
  )

  const router = useRouter()

  const handlePageChange = useCallback(
    async (column) => {
      const sameColumn = column === lastcolumn && order === "asc"
      const newOrder = sameColumn ? "desc" : "asc"
      setOrder(newOrder)
      setLastcolumn(column)

      await router.push({
        query: { column, order: newOrder, page }
      })
    },
    [order, lastcolumn, setOrder, setLastcolumn, router, page]
  )

  const renderFieldContent = (field, content, section) => {
    if ((section !== "users" && field === "name") || field === "topic") {
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
    <table className="table-fixed">
      <thead className="bg-white border-b">
      <tr>
        {columns.map((column, id) => {
          return (
            <th
              onClick={() => handlePageChange(fields[id])}
              className="text-sm font-medium text-gray-900 p-4 text-left uppercase"
              key={column}
            >
              <div className="flex">
                {column}
                {lastcolumn == fields[id] ? (
                  order == "asc" ? (
                    <ChevronDownIcon className="w-6"/>
                  ) : (
                    <ChevronUpIcon className="w-6"/>
                  )
                ) : (
                  ""
                )}
              </div>
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
              {canEdit && !isNoCategory(content) && (
                <NavLink href={`/admin/${section}/${content.id}/edit`}>
                  <PencilSquareIcon className="h-6 w-6"/>
                </NavLink>
              )}
              {deleteRoute && !isNoCategory(content) && (
                <>
                  <TrashIcon
                    className="h-6 w-6"
                    onClick={() => onDeleteClick(content.id)}
                  />
                  <Confirm
                    className={classNames(itemToDelete ? "block" : "hidden")}
                    display={setItemToDelete}
                    action={handleDeletion}
                    textValue="Are you sure you want to delete this item?"
                    params={itemToDelete}
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
