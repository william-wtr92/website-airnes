import { NavLink } from "@/components/utils/NavLink"
import Image from "next/image"
import axios from "axios"
import routes from "@/web/routes"
import { useEffect, useState } from "react"

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get(
        `http://localhost:3000/api${routes.api.selectCategory.getSelectCategory()}`
      )

      const sortedCategories = data.result.sort((a, b) => a.order - b.order)

      setIsLoading(false)
      setCategories(sortedCategories)
    }

    fetchCategories()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (categories.length === 0) {
    return <div>No categories available</div>
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {categories.map((category) => (
        <NavLink
          key={category.user.id}
          href={`/categories/${category.user.id}/category`}
        >
          <div className="h-64 w-80">
            <p className="flex justify-center relative top-1/2 font-bold tracking-widest text-lg">
              {category.user.name}
            </p>
            <Image
              src={category.user.image || "/images/categories.png"}
              alt={category.user.name}
              className="object-cover"
              width={500}
              height={500}
            />
          </div>
        </NavLink>
      ))}
    </div>
  )
}

export default Categories
