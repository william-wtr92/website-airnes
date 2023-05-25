import routes from "@/web/routes"
import getApi from "@/web/getAPI"
import Category from "@/components/app/content/Category"
import {serverSideTranslations} from "next-i18next/serverSideTranslations"

export const getServerSideProps = async (context) => {
  const { locale } = context

  const api = getApi(context)

  const { data } = await api.get(routes.api.app.categories.getCategories())

  return {
    props: {
      categories: data,
      ...(await serverSideTranslations(locale, ["product", "footer", "navbar"]))
    },
  }
}

const AllCategories = (props) => {
  const { categories } = props

  return (
    <>
      <h1 className="flex justify-center font-bold tracking-wide text-xl my-10 uppercase">
        Toutes nos catégories
      </h1>
      <div className="flex flex-wrap justify-center gap-10">
        {categories.length === 0 ? (
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
