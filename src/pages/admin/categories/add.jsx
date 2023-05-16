import {
  selectedCategoryInitialValues,
  selectedCategoryValidationSchema,
} from "@/components/validation/admin/category"
import { useRouter } from "next/router"
import SelectedForm from "@/components/app/admin/SelectedForm"
import { useCallback, useEffect, useState } from "react"
import useAppContext from "@/web/hooks/useAppContext"
import routes from "@/web/routes"
import getApi from "@/web/getAPI"

export const getServerSideProps = async (context) => {
  const { page } = context.query

  const api = getApi(context)

  const redirectToInitial = () => {
    return {
      redirect: {
        destination: "/admin/homepage?page=1",
        permanent: false,
      },
    }
  }

  try {
    const allCategories = await api.get(
      routes.api.admin.categories.getCategories()
    )

    const selectedCategories = await api.get(
      routes.api.admin.selectCategory.getSelectCategory()
    )

    const isEmpty = allCategories.data.result.length === 0

    if (isEmpty && page !== "1") {
      return redirectToInitial()
    }

    return {
      props: {
        allCategories: allCategories.data.result,
        selectedCategories: selectedCategories.data.result,
      },
    }
  } catch (error) {
    return redirectToInitial()
  }
}

const AddSelectedCategory = (props) => {
  const { allCategories, selectedCategories } = props

  const [error, setError] = useState(null)

  const router = useRouter()

  const [categories, setCategories] = useState([])

  useEffect(() => {
    const selectedCategoryIds = new Set(
      selectedCategories.map((item) => item.category_id)
    )
    const unselectedCategories = allCategories.filter(
      (category) => !selectedCategoryIds.has(category.id)
    )

    const options = unselectedCategories.map((item) => ({
      value: item.id,
      label: item.name,
    }))

    setCategories(options)
  }, [selectedCategories, allCategories])

  const {
    actions: { addSelectedCategory },
  } = useAppContext()

  const handlePost = useCallback(
    async (values) => {
      setError(null)

      const [err] = await addSelectedCategory({ categoryId: values.category })

      if (err) {
        setError(err)

        return
      }

      router.push("/admin/homepage")
    },
    [addSelectedCategory, router]
  )

  return (
    <>
      {error && <p>{error}</p>}
      <SelectedForm
        initialValues={selectedCategoryInitialValues}
        validationSchema={selectedCategoryValidationSchema}
        onSubmit={handlePost}
        selectOptions={categories}
        formType="category"
      />
    </>
  )
}

export default AddSelectedCategory
