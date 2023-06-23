import Image from "next/image"
import {NavLink} from "@/components/utils/NavLink"

const HomepageProducts = (props) => {
  const { products } = props

  return (
    <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-8">
      {products.map(({ product }) => (
        <NavLink
          key={product.id}
          href={`/products/${product.id}/product`}
        >
          <div className="h-64 w-80 hover:scale-105">
            <Image
              src={product.image[0].url}
              alt={product.name}
              className="object-cover h-52 rounded-lg"
              width={500}
              height={500}
            />
            <div className="flex font-extrabold uppercase">
              <h1>{product.name}</h1>
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  )
}

export default HomepageProducts
