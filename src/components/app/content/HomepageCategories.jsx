import { NavLink } from "@/components/utils/NavLink"
import Image from "next/image"
import axios from "axios"
import routes from "@/web/routes"
import { useEffect, useState } from "react"

const HomepageCategories = () => {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get(
        `http://localhost:3000/api${routes.api.admin.selectCategory.getSelectCategory()}`
      )

      const sortedCategories = data.result.sort((a, b) => a.order - b.order)

      setIsLoading(false)
      setCategories(sortedCategories)
    }

    fetchCategories()
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 justify-center items-center h-72 lg:h-96">
        <div className="animate-spin w-8 h-8 border-t-2 border-transparent border-primary rounded-full"></div>
        <p className="font-bold">Loading ...</p>
      </div>
    )
  }

  if (categories.length === 0) {
    return (
      <div className="flex flex-col gap-6 justify-center items-center h-72 lg:h-96">
        <div className="animate-spin w-8 h-8 border-t-2 border-transparent border-primary rounded-full"></div>
        <p className="font-bold">No categories available !</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-8">
      {categories.map((category) => (
        <NavLink
          key={category.user.id}
          href={`/categories/${category.user.id}/category`}
        >
          <div className="h-64 w-80  hover:scale-105">
            <p className="flex justify-center relative top-1/2 font-bold tracking-widest text-lg text-black">
              {category.user.name}
            </p>

            <Image
              src={category.user.image}
              alt={category.user.name}
              className="object-cover h-52"
              width={500}
              height={500}
            />
          </div>
        </NavLink>
      ))}
    </div>
  )
}

export default HomepageCategories
