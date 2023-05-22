import {
  categoryInitialValues,
  categoryValidationSchema,
} from "@/components/validation/admin/category"
import { useRouter } from "next/router"
import CategoryForm from "@/components/app/admin/CategoryForm"
import { useCallback, useState } from "react"
import useAppContext from "@/web/hooks/useAppContext"

const CreateCategory = () => {
  const [error, setError] = useState(null)

  const router = useRouter()

  const {
    actions: { addCategory },
  } = useAppContext()

  const handlePost = useCallback(
    async (values) => {
      setError(null)

      const [err] = await addCategory(values)

      if (err) {
        setError(err)

        return
      }

      router.push("/admin/categories/all")
    },
    [addCategory, router]
  )

  return (
    <>
      {error && <p>{error}</p>}
      <CategoryForm
        initialValues={categoryInitialValues}
        validationSchema={categoryValidationSchema}
        onSubmit={handlePost}
      />
    </>
  )
}

CreateCategory.restrictedTo = "admin"

export default CreateCategory
