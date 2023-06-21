import { useRouter } from "next/router"
import SelectedForm from "@/components/app/admin/SelectedForm"
import { useCallback, useEffect, useState } from "react"
import useAppContext from "@/web/hooks/useAppContext"
import getApi from "@/web/getAPI"
import { getAuthorization } from "@/web/helper/getAuthorization"
import getSelectMaterialServices from "@/web/services/admin/homepage/getSelectMaterial"
import getMaterialsServices from "@/web/services/admin/homepage/getMaterials"
import AdminErrorMessage from "@/components/utils/AdminErrorMessage"
import {selectedMaterialInitialValues, selectedMaterialValidationSchema} from "@/components/validation/admin/material"

export const getServerSideProps = async (context) => {
  const redirect = getAuthorization("admin", context.req)

  if (redirect) {
    return redirect
  }

  const api = getApi(context)

  const getSelectMaterial = getSelectMaterialServices({ api })
  const getMaterials = getMaterialsServices({ api })

  const redirectToInitial = () => {
    return {
      redirect: {
        destination: "/admin/homepage",
        permanent: false,
      },
    }
  }

  const [errAllMaterials, allMaterials] = await getSelectMaterial()

  const [errSelectedMaterials, selectedMaterials] = await getMaterials()

  const isEmpty = allMaterials.result.length === 0

  if (isEmpty) {
    return redirectToInitial()
  }

  if (errAllMaterials && errSelectedMaterials) {
    return {
      props: {
        errorMessage: errAllMaterials + " & " + errSelectedMaterials,
      },
    }
  }

  if (errAllMaterials || errSelectedMaterials) {
    return {
      props: {
        errorMessage: errAllMaterials || errSelectedMaterials,
      },
    }
  }

  return {
    props: {
      allMaterials: allMaterials.result,
      selectedMaterials: selectedMaterials.result,
    },
  }
}

const AddSelectedMaterial = (props) => {
  const { allMaterials, selectedMaterials, errorMessage } = props

  const [error, setError] = useState(null)

  const router = useRouter()

  const [materials, setMaterials] = useState([])

  useEffect(() => {
    const selectedMaterialIds = new Set(
        selectedMaterials.map((item) => item.material_id)
    )
    const unselectedMaterials = allMaterials.filter(
      (material) => !selectedMaterialIds.has(material.id)
    )

    const options = unselectedMaterials.map((item) => ({
      value: item.id,
      label: item.name,
    }))

    setMaterials(options)
  }, [selectedMaterials, allMaterials])

  const {
    actions: { addSelectedMaterial },
  } = useAppContext()

  const handlePost = useCallback(
    async (values) => {
      setError(null)

      const [err] = await addSelectedMaterial({ materialId: values.material })

      if (err) {
        setError(err)

        return
      }

      router.push("/admin/homepage")
    },
    [addSelectedMaterial, router]
  )

  return (
    <>
      {errorMessage ? (
        <AdminErrorMessage errorMessage={errorMessage} />
      ) : (
        <>
          {error && <p>{error}</p>}
          <SelectedForm
            initialValues={selectedMaterialInitialValues}
            validationSchema={selectedMaterialValidationSchema}
            onSubmit={handlePost}
            selectOptions={materials}
            formType="material"
          />
        </>
      )}
    </>
  )
}

export default AddSelectedMaterial
