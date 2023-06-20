import getApi from "@/web/getAPI"
import CategoryThumbnail from "@/components/app/content/CategoryThumbnail"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import getCategoriesServices from "@/web/services/app/categories/getCategories"

export const getServerSideProps = async (context) => {
  const { locale } = context

  const api = getApi(context)

  const getCategories = getCategoriesServices({ api })
  const [err, data] = await getCategories()

  if (err) {
    return {
      props: {
        err: err,
        ...(await serverSideTranslations(locale, [
          "categories",
          "footer",
          "navbar",
        ])),
      },
    }
  }

  return {
    props: {
      categories: data,
      ...(await serverSideTranslations(locale, [
        "categories",
        "footer",
        "navbar",
      ])),
    },
  }
}

const AllCategories = (props) => {
  const { categories, err } = props

  const { t } = useTranslation("categories")

  return (
    <>
      <h1 className="flex justify-center font-bold tracking-wide text-xl my-10 uppercase">
        {t(`all`)}
      </h1>
      <div className="flex flex-wrap justify-center gap-10 p-5">
        {categories.length === 0 || err ? (
          <div>
            <p className="text-center">{t(`notfound`)}</p>
          </div>
        ) : (
          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <CategoryThumbnail categories={categories.data} />
          </div>
        )}
      </div>
    </>
  )
}

export default AllCategories
