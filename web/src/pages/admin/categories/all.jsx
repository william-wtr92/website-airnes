import axios from "axios"
import routes from "@/web/routes"
import DisplayPage from "@/components/app/admin/DisplayPage"
import useAppContext from "@/web/hooks/useAppContext"
import { useCallback } from "react"

export const getServerSideProps = async (context) => {
  const { page } = context.query

  const { data } = await axios.get(
    `http://localhost:3000/api${routes.api.admin.categories.getCategories()}?page=${
      page || 1
    }`
  )

  return {
    props: {
      categories: data.result,
      pagination: data.pagination,
    },
  }
}

const All = (props) => {
  const { categories, pagination } = props

  const {
    actions: { deleteCategory },
  } = useAppContext()

  const handleDelete = useCallback(
    async (id) => {
      await deleteCategory(id)

      window.location.reload()
    },
    [deleteCategory]
  )

  return (
    <DisplayPage
      sections={"categories"}
      section={"category"}
      items={categories}
      pagination={pagination}
      canAdd={true}
      canEdit={true}
      canDelete={true}
      deleteRoute={handleDelete}
      columns={["id", "name"]}
      fields={["id", "name"]}
    />
  )
}

export default All
