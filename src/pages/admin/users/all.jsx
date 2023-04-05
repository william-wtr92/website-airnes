import axios from "axios"
import routes from "@/web/routes"
import DisplayPageUser from "@/components/app/admin/DisplayPageUser"

export const getServerSideProps = async (context) => {
  const { page } = context.query

  const redirectToInitial = () => {
    return {
      redirect: {
        destination: "/admin/users/all",
        permanent: false,
      },
    }
  }

  try {
    const { data } = await axios.get(
      `http://localhost:3000/api${routes.api.getUsers()}?page=${page || 1}`
    )

    const isEmpty = data.result.length === 0

    if (isEmpty) {
      return redirectToInitial()
    }

    return {
      props: {
        users: data.result,
        pagination: data.pagination,
      },
    }
  } catch (error) {
    return redirectToInitial()
  }
}

const All = (props) => {
  const { users, pagination } = props

  return (
    <DisplayPageUser sections={"users"} items={users} pagination={pagination} />
  )
}

export default All
