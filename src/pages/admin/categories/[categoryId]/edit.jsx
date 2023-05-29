import CategoryForm from "@/components/app/admin/CategoryForm"
import { categoryValidationSchema } from "@/components/validation/admin/category"
import { useRouter } from "next/router"
import useAppContext from "@/web/hooks/useAppContext"
import { useCallback } from "react"
import { getAuthorization } from "@/web/helper/getAuthorization"
import getApi from "@/web/getAPI"
import categoryDataServices from "@/web/services/admin/categories/categoryData"
import AdminErrorMessage from "@/components/utils/AdminErrorMessage"

export const getServerSideProps = async (context) => {
  const redirect = getAuthorization("admin", context.req)

  if (redirect) {
    return redirect
  }

  const { categoryId } = context.params

  const api = getApi(context)

  const categoryData = categoryDataServices({ api })
  const [err, data] = await categoryData(categoryId)

  if (err) {
    return {
      props: {
        errorMessage: err,
      },
    }
  }

  return {
    props: {
      category: data.result,
    },
  }
}

const EditCategory = (props) => {
  const { category, errorMessage } = props

  const categoryInitialValues = category

  const router = useRouter()

  const {
    actions: { updateCategory },
  } = useAppContext()

  const handlePost = useCallback(
    async (values) => {
      await updateCategory({ ...values, categoryId: category.id })

      await router.push("/admin/categories/all")
    },
    [updateCategory, category.id, router]
  )

  return (
    <>
      {errorMessage ? (
        <AdminErrorMessage errorMessage={errorMessage} />
      ) : (
        <CategoryForm
          initialValues={categoryInitialValues}
          validationSchema={categoryValidationSchema}
          onSubmit={handlePost}
        />
      )}
    </>
  )
}

export default EditCategory
