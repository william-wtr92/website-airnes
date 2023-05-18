import axios from "axios"
import routes from "@/web/routes"
import Category from "@/components/app/content/Category"
import config from "@/api/config"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"

export const getServerSideProps = async (context) => {
  const { locale } = context

  const request = await axios.get(
    `${config.path}api${routes.api.admin.categories.getCategories()}`
  )

  const categories = request.data.result

  const filteredCategories = categories.filter(
    (category) => category.name !== "No category"
  )

  const translations = await serverSideTranslations(locale, [
    "categories",
    "navbar",
    "footer",
  ])

  return {
    props: {
      categories: filteredCategories,
      ...translations,
    },
  }
}

const AllCategories = (props) => {
  const { categories } = props

  const { t } = useTranslation("categories")

  return (
    <>
      <h1 className="flex justify-center font-bold tracking-wide text-xl my-10 uppercase">
        {t(`all`)}
      </h1>
      <div className="flex flex-wrap justify-center gap-10">
        {categories.length === 0 ? (
          <div>
            <p className="text-center">{t(`notfound`)}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5 items-center justify-center p-4">
            <Category categories={categories} />
          </div>
        )}
      </div>
    </>
  )
}

export default AllCategories
