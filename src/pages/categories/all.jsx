import axios from "axios"
import routes from "@/web/routes"
import Category from "@/components/app/content/Category"
import config from "@/api/config"

export const getServerSideProps = async () => {
  const request = await axios.get(
    `${config.path}api${routes.api.admin.categories.getCategories()}`
  )

  const categories = request.data.result

  const filteredCategories = categories.filter(
    (category) => category.name !== "No category"
  )

  return {
    props: {
      categories: filteredCategories,
    },
  }
}

const allCategories = (props) => {
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
          <div className="grid gap-2 grid-cols-1 lg:grid-cols-3">
            <Category categories={categories} />
          </div>
        )}
      </div>
    </>
  )
}

export default allCategories
