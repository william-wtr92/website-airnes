import Image from "next/image"
import { NavLink } from "@/components/utils/NavLink"

const ProductThumbnail = (props) => {
  const { product } = props

  return (
    <NavLink href={`/products/${product.id}/product`}>
      <div className="flex flex-col items-center gap-3 justify-center relative group">
        <Image
          src={product.image[0].url}
          alt={product.name}
          className="w-full h-72 object-cover"
          height={500}
          width={500}
        />
        <div
          className="flex flex-col items-center justify-center lg:gap-5 lg:absolute lg:inset-0 lg:bg-primary lg:bg-opacity-0 lg:transition lg:duration-300 lg:ease-in-out lg:group-hover:bg-opacity-75 lg:p-3">
          <div
            className="lg:hidden lg:group-hover:block text-2xl font-bold text-gray-800 lg:mt-auto lg:mb-2 lg:group-hover:text-white text-center">
            {product.name}
          </div>
          <div className="lg:hidden lg:group-hover:block text-xl font-bold text-gray-800 lg:mb-auto lg:mt-2 lg:group-hover:text-white">
            {product.promotion ? (
              <>
                <p className="line-through">{product.price} €</p>
                <p className="text-red-600 text-lg">{product.promotion} €</p>
              </>
            ) : (
              <p>{product.price} €</p>
            )}
          </div>
        </div>
      </div>
    </NavLink>
  )
}

export default ProductThumbnail
