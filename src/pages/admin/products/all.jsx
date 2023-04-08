import routes from "@/web/routes"
import DisplayPage from "@/components/app/admin/DisplayPage"
import useAppContext from "@/web/hooks/useAppContext"
import {useCallback} from "react"

export const getServerSideProps = async (context) => {
  const { page } = context.query

  const [productsRes] = await Promise.all([
      fetch( `http://localhost:3000/api${routes.api.getProducts()}?page=${page || 1}`),
      ]
  )

  const [products]= await Promise.all([
    productsRes.json(),
  ])


  return {
    props: {
      products: products.result,
      pagination: products.pagination,
    },
  }
}

const All = (props) => {
  const { products, pagination } = props

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
      columns={["id", "name"]}
      fields={["id", "name"]}
    />
  )
}

export default All
