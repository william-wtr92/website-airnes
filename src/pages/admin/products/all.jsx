import routes from "@/web/routes"
import DisplayPage from "@/components/app/admin/DisplayPage"
import useAppContext from "@/web/hooks/useAppContext"
import { useCallback } from "react"
import config from "@/api/config"

export const getServerSideProps = async (context) => {
  const { page, order, column } = context.query
  const clearPage = page || 1
  const clearOrder = order || "asc"
  const clearColumn = column || "id"

  const [productsRes, materialsAndCategoriesRes] = await Promise.all([
    fetch(
      `${
        config.path
      }api${routes.api.admin.products.getProducts()}?page=${clearPage}&order=${clearOrder}&col=${clearColumn}`
    ),
    fetch(
      `${config.path}api${routes.api.admin.materials.getMaterialsAndCategory()}`
    ),
  ])

  const [products, materialsAndCategories] = await Promise.all([
    productsRes.json(),
    materialsAndCategoriesRes.json(),
  ])

  return {
    props: {
      products: products.result,
      pagination: products.pagination,
      categories: materialsAndCategories.categories,
      query: { clearPage, clearOrder, clearColumn },
    },
  }
}

const All = (props) => {
  const { products, pagination, categories, query } = props

  products.forEach((product) => {
    const category = categories.find(
      (category) => category.id === product.categoryId
    )

    if (category) {
      product.categoryId = category.name
    }
  })

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

  return (
    <DisplayPage
      sections={"products"}
      section={"products"}
      items={products}
      pagination={pagination}
      canAdd={true}
      canEdit={true}
      deleteRoute={handleDelete}
      columns={["id", "name", "category", "price", "quantity"]}
      fields={["id", "name", "categoryId", "price", "quantity"]}
      query={query}
    />
  )
}

export default All
