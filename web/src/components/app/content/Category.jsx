import Image from "next/image"
import { NavLink } from "@/components/utils/NavLink"

const Category = (props) => {
  const { categories } = props

  return categories.map((category) => (
    <NavLink key={category.id} href={`/categories/${category.id}/category`}>
      <div className="h-64 w-80">
        <p className="flex justify-center relative top-1/2 font-bold tracking-widest text-lg">
          {category.name}
        </p>
        <Image
          src={category.image || "/images/categories.png"}
          alt={category.name}
          className="object-cover h-52"
          width={500}
          height={500}
        />
      </div>
    </NavLink>
  ))
}

export default Category
