import { useRouter } from "next/router"
import useAppContext from "@/web/hooks/useAppContext"
import { useCallback } from "react"
import { getAuthorization } from "@/web/helper/getAuthorization"
import getApi from "@/web/getAPI"
import materialDataServices from "@/web/services/admin/materials/materialData"
import AdminErrorMessage from "@/components/utils/AdminErrorMessage"
import {materialValidationSchema} from "@/components/validation/admin/material"
import MaterialForm from "@/components/app/admin/MaterialForm"

export const getServerSideProps = async (context) => {
  const redirect = getAuthorization("admin", context.req)

  if (redirect) {
    return redirect
  }

  const { materialId } = context.params

  const api = getApi(context)

  const materialData = materialDataServices({ api })
  const [err, data] = await materialData(materialId)

  const isNoMaterial = data.result.id === 0

  if (isNoMaterial || !data) {
    return {
      redirect: {
        destination: "/admin/materials/all",
      },
    }
  }

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

const EditMaterial = (props) => {
  const { material, errorMessage } = props

  const materialInitialValues = material

  const router = useRouter()

  const {
    actions: { updateMaterial },
  } = useAppContext()

  const handlePost = useCallback(
    async (values) => {
      await updateMaterial({ ...values, materialId: material.id })

      await router.push("/admin/materials/all")
    },
    [updateMaterial, material.id, router]
  )

  return (
    <>
      {errorMessage ? (
        <AdminErrorMessage errorMessage={errorMessage} />
      ) : (
        <MaterialForm
          initialValues={materialInitialValues}
          validationSchema={materialValidationSchema}
          onSubmit={handlePost}
        />
      )}
    </>
  )
}

export default EditMaterial
