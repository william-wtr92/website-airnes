import axios from "axios"
import routes from "@/web/routes"
import DisplayMain from "@/components/app/admin/DisplayMain"
import useAppContext from "@/web/hooks/useAppContext"
import { useCallback, useState } from "react"
import { useRouter } from "next/router"

export const getServerSideProps = async (context) => {
  const { page, deletedImageId } = context.query

  const redirectToInitial = () => {
    return {
      redirect: {
        destination: "/admin/homepage",
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
        deletedImageId: deletedImageId || null,
      },
    }
  } catch (error) {
    return redirectToInitial()
  }
}

const Homepage = (props) => {
  const { images } = props

  const [error, setError] = useState(null)

  const router = useRouter()

  const {
    actions: { deleteCarousel },
  } = useAppContext()

  const handleDelete = useCallback(
    async (imageId) => {
      setError(null)

      const [err] = await deleteCarousel(imageId)

      if (err) {
        setError(imageId)

        return
      }

      router.push(`/admin/homepage?deletedImageId=${imageId}`)
    },
    [deleteCarousel, router]
  )

  return (
    <div className="p-10 absolute top-10 left-0 z-0 lg:top-0 lg:left-64">
      {error && (
        <div className="text-red-500 mb-4">
          <p>Error: {error}</p>
        </div>
      )}
      <DisplayMain
        sectionName={"Carousel"}
        sectionLink={"carousel"}
        contents={images}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default Homepage
