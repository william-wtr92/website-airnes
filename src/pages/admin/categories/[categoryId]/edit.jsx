import CategoryForm from "@/components/app/admin/CategoryForm"
import { categoryValidationSchema } from "@/components/validation/admin/category"
import axios from "axios"
import routes from "@/web/routes"
import { useRouter } from "next/router"
import useAppContext from "@/web/hooks/useAppContext"
import { useCallback } from "react"
import config from "@/api/config"

export const getServerSideProps = async (context) => {
  const { categoryId } = context.params

  const { data } = await axios.get(
    `${config.path}api${routes.api.admin.categories.categoryData(categoryId)}`
  )

  if (!data.result) {
    return {
      redirect: {
        destination: "/admin/categories/all",
        permanent: false,
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
  const { category } = props

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
    <CategoryForm
      initialValues={categoryInitialValues}
      validationSchema={categoryValidationSchema}
      onSubmit={handlePost}
    />
  )
}

export default EditCategory
