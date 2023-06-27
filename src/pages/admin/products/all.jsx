import DisplayPage from "@/components/app/admin/DisplayPage"
import useAppContext from "@/web/hooks/useAppContext"
import { useCallback } from "react"
import getApi from "@/web/getAPI"
import { getAuthorization } from "@/web/helper/getAuthorization"
import getProductsServices from "@/web/services/admin/products/getProducts"
import AdminErrorMessage from "@/components/utils/AdminErrorMessage"
import getMaterialsAndCategoryServices from "@/web/services/admin/materials/getMaterialsAndCategory"

export const getServerSideProps = async (context) => {
  const redirect = getAuthorization("admin", context.req)

  if (redirect) {
    return redirect
  }

  const { page, order, column } = context.query

  const api = getApi(context)

  const clearPage = page || 1
  const clearOrder = order || "asc"
  const clearColumn = column || "id"

  const getProducts = getProductsServices({ api })
  const getMaterialsAndCategory = getMaterialsAndCategoryServices({ api })
  const [errCatAndMat, dataCatAndMat] = await getMaterialsAndCategory()
  const [err, data] = await getProducts(clearPage, clearOrder, clearColumn)

  if (err || errCatAndMat) {
    return {
      props: {
        errorMessage: err,
      },
    }
  }

  return {
    props: {
      categories: dataCatAndMat.categories,
      materials: dataCatAndMat.materials,
      products: data.result,
      pagination: data.pagination,
      query: { clearPage, clearOrder, clearColumn },
    },
  }
}

const AllProducts = (props) => {
  const { products, pagination, query, errorMessage, categories, materials} = props

  const {
    actions: { deleteProduct },
  } = useAppContext()

  const handleDelete = useCallback(
    async (id) => {
      await deleteProduct(id)

      window.location.reload()
    },
    [deleteProduct]
  )

  const items = products.map(product => {
    return {
      ...product,
      materialId: materials.find(material => material.id === product.materialId)?.name,
      categoryId: categories.find(category => category.id === product.categoryId)?.name,
    }
  })

  return (
    <>
      {errorMessage ? (
        <AdminErrorMessage errorMessage={errorMessage} />
      ) : (
        <DisplayPage
          sections={"products"}
          section={"products"}
          items={items}
          pagination={pagination}
          canAdd={true}
          canEdit={true}
          deleteRoute={handleDelete}
          columns={["id", "name", "category", "material", "price", "quantity"]}
          fields={["id", "name", "categoryId", "materialId", "price", "quantity"]}
          query={query}
        />
      )}
    </>
  )
}

export default AllProducts
