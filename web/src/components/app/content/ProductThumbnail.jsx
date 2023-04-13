import Image from "next/image"
import { NavLink } from "@/components/utils/NavLink"

const ProductThumbnail = (props) => {
  const { alt, productId, image, productName, productPrice } = props

  return (
    <NavLink href={`/products/${productId}/product`}>
      <div className="flex flex-col items-center relative group">
        <Image
          src={image}
          alt={alt}
          className="w-full h-72 object-cover"
          height={500}
          width={500}
        />
        <div className="flex flex-col items-center justify-center gap-5 absolute inset-0 bg-primary bg-opacity-0 transition duration-300 ease-in-out group-hover:bg-opacity-75 p-3">
          <div className="hidden group-hover:block text-2xl font-bold text-gray-800 mt-auto mb-2 group-hover:text-white text-center">
            {productName}
          </div>
          <div className="hidden group-hover:block text-xl font-bold text-gray-800 mb-auto mt-2 group-hover:text-white">
            {productPrice} €
          </div>
        </div>
      </div>
    </NavLink>
  )
}

export default ProductThumbnail
