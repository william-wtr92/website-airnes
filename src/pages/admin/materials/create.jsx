import { useRouter } from "next/router"
import { useCallback, useState } from "react"
import useAppContext from "@/web/hooks/useAppContext"
import MaterialForm from "@/components/app/admin/MaterialForm"
import {materialInitialValues, materialValidationSchema} from "@/components/validation/admin/material"

const CreateMaterial = () => {
  const [error, setError] = useState(null)

  const router = useRouter()

  const {
    actions: { addMaterial},
  } = useAppContext()

  const handlePost = useCallback(
    async (values) => {
      setError(null)

      const [err] = await addMaterial(values)

      if (err) {
        setError(err)

        return
      }

      router.push("/admin/materials/all")
    },
    [addMaterial, router]
  )

  return (
    <>
      {error && <p>{error}</p>}
      <MaterialForm
        initialValues={materialInitialValues}
        validationSchema={materialValidationSchema}
        onSubmit={handlePost}
      />
    </>
  )
}

export default CreateMaterial
