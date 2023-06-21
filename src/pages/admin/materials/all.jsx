import DisplayPage from "@/components/app/admin/DisplayPage"
import useAppContext from "@/web/hooks/useAppContext"
import { useCallback } from "react"
import getApi from "@/web/getAPI"
import { getAuthorization } from "@/web/helper/getAuthorization"
import getMaterialsServices from "@/web/services/admin/materials/getMaterials"
import AdminErrorMessage from "@/components/utils/AdminErrorMessage"

export const getServerSideProps = async (context) => {
  const redirect = getAuthorization("admin", context.req)

  if (redirect) {
    return redirect
  }

  const { page, order, column } = context.query

  const clearPage = page || 1
  const clearOrder = order || "asc"
  const clearColumn = column || "id"

  const api = getApi(context)

  const getMaterials = getMaterialsServices({ api })
  const [err, data] = await getMaterials(clearPage, clearOrder, clearColumn)

  if (err) {
    return {
      props: {
        errorMessage: err,
      },
    }
  }

  return {
    props: {
      materials: data.result,
      pagination: data.pagination,
      query: { clearPage, clearOrder, clearColumn },
    },
  }
}

const AllMaterials = (props) => {
  const { materials, pagination, query, errorMessage } = props

  const {
    actions: { deleteMaterial },
  } = useAppContext()

  const handleDelete = useCallback(
    async (id) => {
      await deleteMaterial(id)

      window.location.reload()
    },
    [deleteMaterial]
  )

  return (
    <>
      {errorMessage ? (
        <AdminErrorMessage errorMessage={errorMessage} />
      ) : (
        <DisplayPage
          sections={"materials"}
          section={"material"}
          items={materials}
          pagination={pagination}
          canAdd={true}
          canEdit={true}
          deleteRoute={handleDelete}
          columns={["id", "name"]}
          fields={["id", "name"]}
          query={query}
        />
      )}
    </>
  )
}

export default AllMaterials
