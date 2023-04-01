import { NavLink } from "@/components/utils/NavLink"
import { PlusCircleIcon } from "@heroicons/react/24/outline"
import Table from "@/components/app/ui/Table"
import Pagination from "@/components/app/ui/Pagination"

const DisplayPage = (props) => {
  const { sections, section, items, pagination } = props

  return (
    <div className="md:p-10 p-5 absolute flex flex-col justify-center items-center top-10 left-0 z-0 lg:top-0 lg:left-64 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center gap-2 w-full">
        <div className="p-5">
          <div className="flex flex-row gap-2 items-center">
            <NavLink href="/admin/categories/create">
              <PlusCircleIcon className="h-8 w-8" />
            </NavLink>
            <p>Add a new {section}</p>
          </div>
        </div>
        <div className="flex flex-col overflow-x-auto overflow-hidden py-2 inline-block min-w-full sm:-mx-6 lg:-mx-8 sm:px-6 lg:px-8">
          <Table
            section={sections}
            columns={["ID", "Name"]}
            contents={items}
            canEdit={true}
            canDelete={true}
            fields={["id", "name"]}
          />
        </div>
      </div>
      <Pagination
        totalPages={pagination.totalPages}
        currentPage={pagination.page}
      />
    </div>
  )
}

export default DisplayPage
