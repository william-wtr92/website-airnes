import axios from "axios"
import routes from "@/web/routes"
import DisplayMain from "@/components/app/admin/DisplayMain"
import useAppContext from "@/web/hooks/useAppContext"
import { useCallback, useState, useEffect } from "react"
import { useRouter } from "next/router"

export const getServerSideProps = async (context) => {
  const { page, deletedImageId } = context.query

  const redirectToInitial = () => {
    return {
      redirect: {
        destination: "/admin/homepage?page=1",
        permanent: false,
      },
    }
  }

  try {
    const [imagesRes, categoriesRes] = await Promise.all([
      axios.get(
        `http://localhost:3000/api${routes.api.carousel.getImages()}?page=${
          page || 1
        }`
      ),
      axios.get(
        `http://localhost:3000/api${routes.api.getCategories()}?page=${
          page || 1
        }`
      ),
    ])

    const isEmpty = imagesRes.data.result.length === 0

    if (isEmpty && page !== "1") {
      return redirectToInitial()
    }

    return {
      props: {
        images: imagesRes.data.result,
        categories: categoriesRes.data.result,
        deletedImageId: deletedImageId || null,
      },
    }
  } catch (error) {
    return redirectToInitial()
  }
}

const Homepage = (props) => {
  const { images, categories } = props

  const [error, setError] = useState(null)
  const [sortedImages, setSortedImages] = useState(
    [...images].sort((a, b) => a.order - b.order)
  )

  useEffect(() => {
    setSortedImages([...images].sort((a, b) => a.order - b.order))
  }, [images])

  const router = useRouter()

  const {
    actions: { deleteCarousel, orderCarousel },
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

  const handleMove = useCallback(
    async (imageId, direction) => {
      const [err] = await orderCarousel(imageId, direction === "up" ? -1 : 1)

      if (err) {
        setError(err)

        return
      }

      const updatedImages = [...sortedImages]
      const currentIndex = updatedImages.findIndex((img) => img.id === imageId)
      const newIndex = currentIndex + (direction === "up" ? -1 : 1)

      if (newIndex >= 0 && newIndex < updatedImages.length) {
        const temp = updatedImages[currentIndex].order
        updatedImages[currentIndex].order = updatedImages[newIndex].order
        updatedImages[newIndex].order = temp

        setSortedImages(updatedImages.sort((a, b) => a.order - b.order))
      }
    },
    [orderCarousel, sortedImages]
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
        contents={sortedImages}
        onDelete={handleDelete}
        onMove={handleMove}
        renderContent={"carousel"}
        className={"mt-10"}
      />
      <DisplayMain
        sectionName={"Categories"}
        sectionLink={"categories"}
        contents={categories}
        renderContent={"category"}
        className={"mt-28"}
      />
    </div>
  )
}

export default Homepage
