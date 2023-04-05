import routes from "@/web/routes"
import DisplayPage from "@/components/app/admin/DisplayPage"

export const getServerSideProps = async (context) => {
  const { page } = context.query

  const [productsRes, materiatAndCategoriesRes] = await Promise.all([
      fetch( `http://localhost:3000/api${routes.api.getProducts()}?page=${page || 1}`),
      fetch(`http://localhost:3000/api${routes.api.getMaterialsAndCategory()}`)
      ]
  )

  const [products, materiatAndCategories]= await Promise.all([
    productsRes.json(),
    materiatAndCategoriesRes.json()
  ])


  return {
    props: {
      products: products.result,
      pagination: products.pagination,
      categories: materiatAndCategories.categories,
      materials: materiatAndCategories.materials
    },
  }
}

const All = (props) => {
  const { products, pagination, categories, materials } = props

  console.log(categories, materials)
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
