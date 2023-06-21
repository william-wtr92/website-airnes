import Return from "@/components/app/ui/Return"
import { NavLink } from "@/components/utils/NavLink"
import Confirm from "@/components/app/ui/Confirm"
import classNames from "classnames"
import { useCallback, useState } from "react"
import useAppContext from "@/web/hooks/useAppContext"
import { useRouter } from "next/router"
import getApi from "@/web/getAPI"
import { getAuthorization } from "@/web/helper/getAuthorization"
import materialDataServices from "@/web/services/admin/materials/materialData"
import AdminErrorMessage from "@/components/utils/AdminErrorMessage"

export const getServerSideProps = async (context) => {
  const redirect = getAuthorization("admin", context.req)

  if (redirect) {
    return redirect
  }

  const { materialId } = context.params

  const api = getApi(context)

  const materialData = materialDataServices({ api })
  const [err, data] = await materialData(materialId)

  if (err) {
    return {
      props: {
        errorMessage: err,
      },
    }
  }

  return {
    props: {
      material: data.result,
    },
  }
}

const ShowMaterial = (props) => {
  const { material, errorMessage } = props

  const [itemToDelete, setItemToDelete] = useState(false)
  const router = useRouter()

  const {
    actions: { deleteMaterial },
  } = useAppContext()

  const isNoMaterial = (material) => {
    return material.id === 0
  }

  const onDeleteClick = (id) => {
    setItemToDelete(id)
  }

  const handleDeletion = useCallback(
    async (id) => {
      await deleteMaterial(id)
      setItemToDelete(false)

      router.push("/admin/materials/all")
    },
    [deleteMaterial, router]
  )

  return (
    <>
      {errorMessage ? (
        <AdminErrorMessage errorMessage={errorMessage} />
      ) : (
        <div className="p-10 flex flex-col gap-10 absolute top-10 left-0 z-0 lg:top-0 lg:left-64">
          <Return name="materials" back={"/admin/materials/all"} />
          <div className="font-bold">{material.name}</div>
          <div>{material.description}</div>
          <div className="flex gap-5">
            {!isNoMaterial(material) && (
              <>
                <NavLink href={`/admin/materials/${material.id}/edit`}>
                  <button className="uppercase bg-white text-gray-500 font-bold rounded-full border-2 px-4 py-1">
                    Edit
                  </button>
                </NavLink>
                <>
                  <button
                    className="uppercase bg-white text-gray-500 font-bold rounded-full border-2 px-4 py-1"
                    onClick={() => onDeleteClick(material.id)}
                  >
                    Delete
                  </button>
                  <Confirm
                    className={classNames(itemToDelete ? "block" : "hidden")}
                    display={setItemToDelete}
                    action={handleDeletion}
                    textValue="Are you sure you want to delete this item?"
                    params={itemToDelete}
                  />
                </>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default ShowMaterial
