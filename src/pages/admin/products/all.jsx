import routes from "@/web/routes"
import DisplayPage from "@/components/app/admin/DisplayPage"
import useAppContext from "@/web/hooks/useAppContext"
import {useCallback} from "react"

export const getServerSideProps = async (context) => {
  const { page } = context.query

  const [productsRes, materialsAndCategoriesRes] = await Promise.all([
    fetch(
      `http://localhost:3000/api${routes.api.admin.products.getProducts()}?page=${
        page || 1
      }`
    ),
    fetch(`http://localhost:3000/api${routes.api.admin.materials.getMaterialsAndCategory()}`)
  ])

  const [products, materialsAndCategories] = await Promise.all([productsRes.json(),materialsAndCategoriesRes.json()])

  return {
    props: {
      products: products.result,
      pagination: products.pagination,
      categories: materialsAndCategories.categories
    },
  }
}

const All = (props) => {
  const { products, pagination, categories } = props

  products.forEach(product => {
    const category = categories.find(category => category.id === product.categoryId)

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
      columns={["id", "name", "category"]}
      fields={["id", "name", "categoryId"]}
    />
  )
}

export default All
