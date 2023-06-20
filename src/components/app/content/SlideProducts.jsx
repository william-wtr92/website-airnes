import Image from "next/image"
import { NavLink } from "@/components/utils/NavLink"

const SlideProducts = (props) => {
  const { image, productId, productName, productPrice, promotion } = props

  return (
    <>
      <NavLink href={`/products/${productId}/product`}>
        <Image
          src={image}
          alt={productName}
          className="border border-black w-full h-60 object-cover"
          width={500}
          height={500}
        />
        <div className="flex flex-col font-extrabold uppercase p-1">
          <h1>{productName}</h1>
          {promotion ? (
            <div className="text-right">
              <p className="line-through">{productPrice} €</p>
              <p className="text-red-600 text-xl">{promotion} €</p>
            </div>
          ) : (
            <p>{productPrice} €</p>
          )}
        </div>
      </NavLink>
    </>
  )
}

export default SlideProducts
