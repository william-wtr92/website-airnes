import Image from "next/image"
import { NavLink } from "@/components/utils/NavLink"

const CategoryThumbnail = (props) => {
  const { categories } = props

  return categories.map((category) => (
    <NavLink key={category.id} href={`/categories/${category.id}/category`}>
      <div className="flex flex-col items-center justify-center relative group hover:scale-105 animation ease-in-out duration-500">
        <div
          className="flex flex-col items-center justify-center absolute inset-0 bg-primary bg-opacity-30 group-hover:bg-opacity-0 lg:p-3">
          <div
            className="block group-hover:hidden text-2xl font-bold lg:mt-auto lg:mb-2 text-white text-center uppercase">
            {category.name}
          </div>
        </div>
        <Image
          src={category.image}
          alt={category.name}
          className="object-cover h-64 w-full"
          width={500}
          height={500}
        />
      </div>
    </NavLink>
  ))
}

export default CategoryThumbnail
