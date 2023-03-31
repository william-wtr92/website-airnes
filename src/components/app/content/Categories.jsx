import { NavLink } from "@/components/utils/NavLink"
import Image from "next/image"

const Categories = (props) => {
  const { catName, id } = props

  return (
    <NavLink href={`/categories/${id}/category`}>
      <div className="h-64 w-80">
        <p className="flex justify-center relative top-1/2 font-bold tracking-widest text-lg">
          {catName}
        </p>
        <Image
          src="/images/categories.png"
          alt="cat1"
          className="object-cover"
          width={500}
          height={500}
        />
      </div>
    </NavLink>
  )
}

export default Categories
