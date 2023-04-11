import Image from "next/image"
import { NavLink } from "@/components/utils/NavLink"

const Promotion = (props) => {
  const { image, alt, productName, productPrice, promotion } = props

  return (
    <>
      {/*productId needs to be replaced by the real product id*/}
      <NavLink href={"/products/productId/product"}>
        <Image
          src={image}
          alt={alt}
          className="border-2 border-black w-full h-60 object-cover"
          width={500}
          height={500}
        />
        <div className="flex justify-between font-extrabold uppercase p-1">
          <h1>{productName}</h1>
          {promotion ? (
            <div className="text-right">
              <p className="line-through">{productPrice} €</p>
              <p className="text-red-600 text-lg">{promotion} €</p>
            </div>
          ) : (
            <p>{productPrice} €</p>
          )}
        </div>
      </NavLink>
    </>
  )
}

export default Promotion
