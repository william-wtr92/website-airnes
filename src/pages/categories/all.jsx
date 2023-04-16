import axios from "axios"
import routes from "@/web/routes"
import Category from "@/components/app/content/Category"

export const getServerSideProps = async () => {
  const request = await axios.get(
    `http://localhost:3000/api${routes.api.admin.categories.getCategories()}`
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
          <div className="flex flex-col gap-5 items-center justify-center p-4">
            <Category categories={categories} />
          </div>
        )}
      </div>
    </>
  )
}

export default allCategories
