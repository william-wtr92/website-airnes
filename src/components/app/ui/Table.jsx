import { NavLink } from "@/components/utils/NavLink"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"

const Table = (props) => {
  const {
    section,
    columns,
    contents,
    canEdit,
    canDelete,
    fields,
    labelField = false,
  } = props

  return (
    <table className="table-auto">
      <thead className="bg-white border-b">
        <tr>
          {columns.map((column) => {
            return (
              <th
                className="text-sm font-medium text-gray-900 p-4 text-left"
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
                    {field === (labelField ? "label" : "name") ? (
                      <NavLink href={`/admin/${section}/${content.id}/show`}>
                        {content[field]}
                      </NavLink>
                    ) : (
                      content[field]
                    )}
                  </td>
                )
              })}
              <td className="flex flex-row gap-5 text-sm text-gray-900 font-light py-4">
                {canEdit ? (
                  <NavLink href={`/admin/${section}/${content.id}/edit`}>
                    <PencilSquareIcon className="h-6 w-6" />
                  </NavLink>
                ) : null}
                {canDelete ? (
                  <button>
                    <TrashIcon className="h-6 w-6" />
                  </button>
                ) : null}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
