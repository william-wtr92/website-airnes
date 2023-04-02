import Table from "@/components/app/ui/Table"
import Pagination from "@/components/app/ui/Pagination"

const DisplayPageUser = (props) => {
  const { sections, items, pagination } = props

  return (
    <div className="md:p-10 p-5 absolute flex flex-col justify-center items-center top-10 left-0 z-0 lg:top-0 lg:left-64 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center gap-2 w-full">
        <div className="flex flex-col overflow-x-auto overflow-hidden py-2 min-w-full sm:-mx-6 lg:-mx-8 sm:px-6 lg:px-8">
          <Table
            section={sections}
            columns={["ID", "Name", "Mail", "Role"]}
            contents={items}
            canEdit={true}
            canDelete={true}
            fields={["id", "name", "mail", "right"]}
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

export default DisplayPageUser
