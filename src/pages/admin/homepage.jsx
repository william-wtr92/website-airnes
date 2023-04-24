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
    const [imagesRes, categoriesRes, productsRes] = await Promise.all([
      axios.get(
        `http://localhost:3000/api${routes.api.admin.carousel.getImages()}?page=${
          page || 1
        }`
      ),
      axios.get(
        `http://localhost:3000/api${routes.api.admin.selectCategory.getSelectCategory()}`
      ),
      axios.get(
        `http://localhost:3000/api${routes.api.admin.selectProduct.getSelectProducts()}`
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
        products: productsRes.data.result,
        deletedImageId: deletedImageId || null,
      },
    }
  } catch (error) {
    return redirectToInitial()
  }
}

const Homepage = (props) => {
  const { images, categories, products } = props

  const [error, setError] = useState(null)

  const [sortedImages, setSortedImages] = useState(
    [...images].sort((a, b) => a.order - b.order)
  )

  const [sortedCategories, setSortedCategories] = useState(
    [...categories].sort((a, b) => a.order - b.order)
  )

  const [sortedProducts, setSortedProducts] = useState(
    [...products].sort((a, b) => a.order - b.order)
  )

  useEffect(() => {
    setSortedImages([...images].sort((a, b) => a.order - b.order))
    setSortedCategories([...categories].sort((a, b) => a.order - b.order))
    setSortedProducts([...products].sort((a, b) => a.order - b.order))
  }, [images, categories, products])

  const router = useRouter()

  const {
    actions: {
      deleteCarousel,
      orderCarousel,
      deleteSelectedCategory,
      orderSelectedCategory,
      deleteSelectedProduct,
      orderSelectedProduct,
    },
  } = useAppContext()

  const handleDeleteCarousel = useCallback(
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

  const handleDeleteCategory = useCallback(
    async (categoryId) => {
      setError(null)

      const [err] = await deleteSelectedCategory(categoryId)

      if (err) {
        setError(categoryId)

        return
      }

      router.push(`/admin/homepage?deletedCategoryId=${categoryId}`)
    },
    [deleteSelectedCategory, router]
  )

  const handleDeleteProduct = useCallback(
    async (productId) => {
      setError(null)

      const [err] = await deleteSelectedProduct(productId)

      if (err) {
        setError(productId)

        return
      }

      router.push(`/admin/homepage?deletedProductId=${productId}`)
    },
    [deleteSelectedProduct, router]
  )

  const handleMoveCarousel = useCallback(
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

  const handleMoveCategory = useCallback(
    async (categoryId, direction) => {
      const [err] = await orderSelectedCategory(
        categoryId,
        direction === "up" ? -1 : 1
      )

      if (err) {
        setError(err)

        return
      }

      const updatedCategories = [...sortedCategories]

      const currentIndex = updatedCategories.findIndex(
        (cat) => cat.id === categoryId
      )
      const newIndex = currentIndex + (direction === "up" ? -1 : 1)

      if (newIndex >= 0 && newIndex < updatedCategories.length) {
        const temp = updatedCategories[currentIndex].order
        updatedCategories[currentIndex].order =
          updatedCategories[newIndex].order
        updatedCategories[newIndex].order = temp

        setSortedCategories(updatedCategories.sort((a, b) => a.order - b.order))
      }
    },
    [orderSelectedCategory, sortedCategories]
  )

  const handleMoveProduct = useCallback(
    async (productId, direction) => {
      const [err] = await orderSelectedProduct(
        productId,
        direction === "up" ? -1 : 1
      )

      if (err) {
        setError(err)

        return
      }

      const updatedProducts = [...sortedProducts]

      const currentIndex = updatedProducts.findIndex(
        (pdt) => pdt.id === productId
      )
      const newIndex = currentIndex + (direction === "up" ? -1 : 1)

      if (newIndex >= 0 && newIndex < updatedProducts.length) {
        const temp = updatedProducts[currentIndex].order
        updatedProducts[currentIndex].order = updatedProducts[newIndex].order
        updatedProducts[newIndex].order = temp

        setSortedProducts(updatedProducts.sort((a, b) => a.order - b.order))
      }
    },
    [orderSelectedProduct, sortedProducts]
  )

  return (
    <div className="lg:absolute lg:top-0 lg:left-[20%]">
      {error && (
        <div className="text-red-500 mb-4">
          <p>Error: {error}</p>
        </div>
      )}
      <DisplayMain
        sectionName={"Carousel"}
        sectionLink={"carousel"}
        contents={sortedImages}
        onDelete={handleDeleteCarousel}
        onMove={handleMoveCarousel}
        renderContent={"carousel"}
        className={"mt-10"}
      />
      <DisplayMain
        sectionName={"Categories"}
        sectionLink={"categories"}
        contents={sortedCategories}
        onDelete={handleDeleteCategory}
        onMove={handleMoveCategory}
        renderContent={"category"}
        className={"mt-28"}
      />
      <DisplayMain
        sectionName={"Products"}
        sectionLink={"products"}
        contents={sortedProducts}
        onDelete={handleDeleteProduct}
        onMove={handleMoveProduct}
        renderContent={"products"}
        className={"mt-28 mb-6"}
      />
    </div>
  )
}

export default Homepage
