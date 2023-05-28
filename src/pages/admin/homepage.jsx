import DisplayMain from "@/components/app/admin/DisplayMain"
import useAppContext from "@/web/hooks/useAppContext"
import { useCallback, useState, useEffect } from "react"
import { useRouter } from "next/router"
import getApi from "@/web/getAPI"
import { getAuthorization } from "@/web/helper/getAuthorization"
import getImageServices from "@/web/services/admin/homepage/getImages"
import getSelectCategoryServices from "@/web/services/admin/homepage/getSelectCategory"
import getSelectProductsServices from "@/web/services/admin/homepage/getSelectProducts"
import AdminErrorMessage from "@/components/utils/AdminErrorMessage"

export const getServerSideProps = async (context) => {
  const redirect = getAuthorization("admin", context.req)

  if (redirect) {
    return redirect
  }

  const api = getApi(context)
  const getImage = getImageServices({ api })
  const getSelectCategory = getSelectCategoryServices({ api })
  const getSelectProducts = getSelectProductsServices({ api })

  const [errImagesRes, imagesRes] = await getImage()

  const [errCategoriesRes, categoriesRes] = await getSelectCategory()

  const [errProductsRes, productsRes] = await getSelectProducts()

  return {
    props: {
      images: errImagesRes ? null : imagesRes.result,
      categories: errCategoriesRes ? null : categoriesRes.result,
      products: errProductsRes ? null : productsRes.result,
      errorMessageImages: errImagesRes || null,
      errorMessageCategories: errCategoriesRes || null,
      errorMessageProducts: errProductsRes || null,
    },
  }
}

const Homepage = (props) => {
  const {
    images,
    categories,
    products,
    errorMessageImages,
    errorMessageCategories,
    errorMessageProducts,
  } = props

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

      router.push(`/admin/homepage`)
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
      <>
        {errorMessageImages ? (
          <AdminErrorMessage errorMessage={errorMessageImages} />
        ) : (
          <DisplayMain
            sectionName={"Carousel"}
            sectionLink={"carousel"}
            contents={sortedImages}
            onDelete={handleDeleteCarousel}
            onMove={handleMoveCarousel}
            renderContent={"carousel"}
            className={"mt-10"}
          />
        )}
      </>
      <>
        {errorMessageCategories ? (
          <AdminErrorMessage errorMessage={errorMessageCategories} />
        ) : (
          <DisplayMain
            sectionName={"Categories"}
            sectionLink={"categories"}
            contents={sortedCategories}
            onDelete={handleDeleteCategory}
            onMove={handleMoveCategory}
            renderContent={"category"}
            className={"mt-28"}
          />
        )}
      </>
      <>
        {errorMessageProducts ? (
          <AdminErrorMessage errorMessage={errorMessageProducts} />
        ) : (
          <DisplayMain
            sectionName={"Products"}
            sectionLink={"products"}
            contents={sortedProducts}
            onDelete={handleDeleteProduct}
            onMove={handleMoveProduct}
            renderContent={"products"}
            className={"mt-28 mb-6"}
          />
        )}
      </>
    </div>
  )
}

export default Homepage
