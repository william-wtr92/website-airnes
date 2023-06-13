import Image from "next/image"
import { NavLink } from "@/components/utils/NavLink"

const ProductOrder = (props) => {
  const { product } = props

  const { productData } = product

  return (
    <div className="flex">
      <Image
        src={productData.image[0].url}
        alt="meuble"
        width={100}
        height={1}
        className="w-20 h-20 md:h-24 md:w-28 hover:cursor-pointer"
      />
      <div className="flex flex-col px-4 gap-3">
        <NavLink href={`/products/${productData.id}/product`}>
          <p className="text-sm mt-2 font-bold hover:text-primary text-xl">
            {productData.name}
          </p>
        </NavLink>
        <div className="flex">
          <p className="border-2 rounded-md px-2">{product.product_quantity}</p>
        </div>
        {productData.promotion ? (
          <div className="flex gap-3 items-center">
            <p className="line-through">{productData.price} €</p>
            <p className="text-red-600 text-xl">{productData.promotion} €</p>
          </div>
        ) : (
          <p>{productData.price} €</p>
        )}
      </div>
    </div>
  )
}

export default ProductOrder
