import { NavLink } from "@/components/utils/NavLink"
import Image from "next/image"

const HomepageCategories = (props) => {
  const { categories } = props

  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-8">
      {categories.map(({ category }) => (
        <NavLink key={category.id} href={`/categories/${category.id}/category`}>
          <div className="h-64 w-80 hover:scale-105">
            <Image
              src={category.image}
              alt={category.name}
              className="object-cover h-52 w-full rounded-lg"
              width={500}
              height={500}
            />
            <p className="flex justify-center top-1/2 font-bold tracking-widest uppercase text-lg text-black">
              {category.name}
            </p>
          </div>
        </NavLink>
      ))}
    </div>
  )
}

export default HomepageCategories
