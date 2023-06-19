import Image from "next/image"
import { NavLink } from "@/components/utils/NavLink"

const ProductThumbnail = (props) => {
  const { product } = props

  return (
    <NavLink href={`/products/${product.id}/product`}>
      <div className="flex flex-col items-center relative group">
        <Image
          src={product.image[0].url}
          alt={product.alt}
          className="w-full h-72 object-cover"
          height={500}
          width={500}
        />
        <div
          className="flex flex-col items-center justify-center gap-5 absolute inset-0 bg-primary bg-opacity-0 transition duration-300 ease-in-out group-hover:bg-opacity-75 p-3">
          <div
            className="hidden group-hover:block text-2xl font-bold text-gray-800 mt-auto mb-2 group-hover:text-white text-center">
            {product.name}
          </div>
          <div className="hidden group-hover:block text-xl font-bold text-gray-800 mb-auto mt-2 group-hover:text-white">
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
