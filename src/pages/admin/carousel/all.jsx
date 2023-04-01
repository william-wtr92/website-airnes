import axios from "axios"
import routes from "@/web/routes"
import DisplayPage from "@/components/app/admin/DisplayPage"

export const getServerSideProps = async (context) => {
  const { page } = context.query

  const redirectToInitial = () => {
    return {
      redirect: {
        destination: "/admin/carousel/all",
        permanent: false,
      },
    }
  }

  try {
    const { data } = await axios.get(
      `http://localhost:3000/api${routes.api.carousel.getImages()}?page=${
        page || 1
      }`
    )

    const isEmpty = data.result.length === 0

    if (isEmpty) {
      return redirectToInitial()
    }

    return {
      props: {
        images: data.result,
        pagination: data.pagination,
      },
    }
  } catch (error) {
    return redirectToInitial()
  }
}

const All = (props) => {
  const { images, pagination } = props

  return (
    <DisplayPage
      sections={"images"}
      section={"carousel"}
      items={images}
      pagination={pagination}
    />
  )
}

export default All
