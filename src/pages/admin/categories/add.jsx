import {
  selectedCategoryInitialValues,
  selectedCategoryValidationSchema,
} from "@/components/validation/admin/category"
import { useRouter } from "next/router"
import SelectedForm from "@/components/app/admin/SelectedForm"
import { useCallback, useEffect, useState } from "react"
import useAppContext from "@/web/hooks/useAppContext"
import getApi from "@/web/getAPI"
import { getAuthorization } from "@/web/helper/getAuthorization"
import getSelectCategoryServices from "@/web/services/admin/homepage/getSelectCategory"
import getCategoriesServices from "@/web/services/admin/homepage/getCategories"
import AdminErrorMessage from "@/components/utils/AdminErrorMessage"

export const getServerSideProps = async (context) => {
  const redirect = getAuthorization("admin", context.req)

  if (redirect) {
    return redirect
  }

  const api = getApi(context)

  const getSelectCategory = getSelectCategoryServices({ api })
  const getCategories = getCategoriesServices({ api })

  const redirectToInitial = () => {
    return {
      redirect: {
        destination: "/admin/homepage",
        permanent: false,
      },
    }
  }

  const [errAllCategories, allCategories] = await getCategories()

  const [errSelectedCategories, selectedCategories] = await getSelectCategory()

  const isEmpty = allCategories.result.length === 0

  if (isEmpty) {
    return redirectToInitial()
  }

  if (errAllCategories && errSelectedCategories) {
    return {
      props: {
        errorMessage: errAllCategories + " & " + errSelectedCategories,
      },
    }
  }

  if (errAllCategories || errSelectedCategories) {
    return {
      props: {
        errorMessage: errAllCategories || errSelectedCategories,
      },
    }
  }

  return {
    props: {
      allCategories: allCategories.result,
      selectedCategories: selectedCategories.result,
    },
  }
}

const AddSelectedCategory = (props) => {
  const { allCategories, selectedCategories, errorMessage } = props

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
      {errorMessage ? (
        <AdminErrorMessage errorMessage={errorMessage} />
      ) : (
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
      )}
    </>
  )
}

export default AddSelectedCategory
