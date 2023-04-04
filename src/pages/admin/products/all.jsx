import axios from "axios"
import routes from "@/web/routes"
import DisplayPage from "@/components/app/admin/DisplayPage"

export const getServerSideProps = async (context) => {
  const { page } = context.query

  const redirectToInitial = () => {
    return {
      redirect: {
        destination: "/admin/products/all",
        permanent: false,
      },
    }
  }

  try {
    const { data } = await axios.get(
      `http://localhost:3000/api${routes.api.getProducts()}?page=${page || 1}`
    )

    const isEmpty = data.result.length === 0

    if (isEmpty) {
      return redirectToInitial()
    }

    return {
      props: {
        products: data.result,
        pagination: data.pagination,
      },
    }
  } catch (error) {
    return redirectToInitial()
  }
}

const All = (props) => {
  const { products, pagination } = props

  return (
    <DisplayPage
      sections={"products"}
      section={"products"}
      items={products}
      pagination={pagination}
      canAdd={true}
      canEdit={true}
      columns={["id", "name"]}
      fields={["id", "name"]}
    />
  )
}

export default All
