import axios from "axios"
import routes from "@/web/routes"
import DisplayPage from "@/components/app/admin/DisplayPage"

export const getServerSideProps = async (context) => {
  const {page} = context.query
  const {data} = await axios.get(
    `http://localhost:3000/api${routes.api.getCategories()}?page=${page || 1}`
  )

  return {
    props: {
      categories: data.result,
      pagination: data.pagination,
    },
  }
}

const All = (props) => {
  const {categories, pagination} = props

  return (
    <DisplayPage
      sections={"categories"}
      section={"category"}
      items={categories}
      pagination={pagination}
    />
  )
}

export default All
