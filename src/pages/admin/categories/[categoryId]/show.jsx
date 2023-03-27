import Return from "@/components/app/ui/Return"
import axios from "axios"
import routes from "@/web/routes"
import {NavLink} from "@/components/utils/NavLink"
import {router} from "next/client"

export const getServerSideProps = async (context) => {
  const {categoryId} = context.params

  const {data} = await axios.get(
    `http://localhost:3000${routes.api.categoryData(categoryId)}`
  )

  if (!data.result) {
    await router.push("/admin/categories/all")
  }

  return {
    props: {
      category: data.result,
    },
  }
}

const ShowCategory = (props) => {
  const {category} = props

  return (
    <div className="p-10 flex flex-col gap-10 absolute top-10 left-0 z-0 lg:top-0 lg:left-64">
      <Return name="categories" back={"/admin/categories/all"}/>
      <img src={category.image} alt={category.name} className="object-cover md:w-96 md:h-64"/>
      <div className="font-bold">{category.name}</div>
      <div>
        {category.description}
      </div>
      <div className="flex gap-5">
        <NavLink href={"/"}>
          <button className="uppercase bg-white text-gray-500 font-bold rounded-full border-2 px-4 py-1">
            Edit
          </button>
        </NavLink>
        <NavLink href={"/"}>
          <button className="uppercase bg-white text-gray-500 font-bold rounded-full border-2 px-4 py-1">
            Delete
          </button>
        </NavLink>
      </div>
    </div>
  )
}

export default ShowCategory