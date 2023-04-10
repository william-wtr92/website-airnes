import Image from "next/image"
import { NavLink } from "@/components/utils/NavLink"

const Product = (props) => {
  const { alt, productId, image, productName, productPrice } = props

  return (
    <NavLink href={`/products/${productId}/product`}>
      <div className="flex flex-col items-center">
        <Image
          src={image}
          alt={alt}
          className="w-full h-72 object-cover"
          height={500}
          width={500}
        />
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-bold text-gray-800">{productName}</h3>
          <p className="text-xl font-bold text-gray-800">${productPrice}</p>
        </div>
      </div>
    </NavLink>
  )
}

export default Product
