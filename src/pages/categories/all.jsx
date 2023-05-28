import getApi from "@/web/getAPI"
import Category from "@/components/app/content/Category"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
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
          "product",
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
        "product",
        "footer",
        "navbar",
      ])),
    },
  }
}

const AllCategories = (props) => {
  const { categories, err } = props

  return (
    <>
      <h1 className="flex justify-center font-bold tracking-wide text-xl my-10 uppercase">
        Toutes nos catégories
      </h1>
      <div className="flex flex-wrap justify-center gap-10">
        {categories.length === 0 || err ? (
          <div>
            <p className="text-center">Aucune catégorie n'a été trouvée.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5 items-center justify-center p-4">
            <Category categories={categories.data} />
          </div>
        )}
      </div>
    </>
  )
}

export default AllCategories
