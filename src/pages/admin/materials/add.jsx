import { useRouter } from "next/router"
import SelectedForm from "@/components/app/admin/SelectedForm"
import { useCallback, useState } from "react"
import useAppContext from "@/web/hooks/useAppContext"
import getApi from "@/web/getAPI"
import { getAuthorization } from "@/web/helper/getAuthorization"
import getMaterialsServices from "@/web/services/admin/homepage/getMaterials"
import AdminErrorMessage from "@/components/utils/AdminErrorMessage"
import {selectedMaterialInitialValues, selectedMaterialValidationSchema} from "@/components/validation/admin/material"

export const getServerSideProps = async (context) => {
  const redirect = getAuthorization("admin", context.req)

  if (redirect) {
    return redirect
  }

  const api = getApi(context)

  const getMaterials = getMaterialsServices({ api })

  const redirectToInitial = () => {
    return {
      redirect: {
        destination: "/admin/homepage",
        permanent: false,
      },
    }
  }

  const [errAllMaterials, allMaterials] = await getMaterials()

  const isEmpty = allMaterials.result.length === 0

  if (isEmpty) {
    return redirectToInitial()
  }

  if (errAllMaterials) {
    return {
      props: {
        errorMessage: errAllMaterials,
      },
    }
  }

  return {
    props: {
      allMaterials: allMaterials.result,
    },
  }
}

const AddSelectedMaterial = (props) => {
  const { allMaterials, errorMessage } = props

  const [error, setError] = useState(null)

  const router = useRouter()

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
            selectOptions={allMaterials}
            formType="material"
          />
        </>
      )}
    </>
  )
}

export default AddSelectedMaterial
