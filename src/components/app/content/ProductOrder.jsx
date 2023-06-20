import Image from "next/image"
import { NavLink } from "@/components/utils/NavLink"

const ProductOrder = (props) => {
  const { product } = props

  const { productData } = product

  return (
    <div className="flex">
      <Image
        src={productData.image[0].url}
        alt={productData.name}
        width={100}
        height={1}
        className="w-20 h-20 md:h-24 md:w-28 hover:cursor-pointer object-cover"
      />
      <div className="flex flex-col px-4 gap-3">
        <NavLink href={`/products/${productData.id}/product`}>
          <div className="text-sm mt-2 font-bold hover:text-primary text-xl">
            {productData.name}
          </div>
        </NavLink>
        <div className="flex">
          <div className="border-2 rounded-md px-2">{product.product_quantity}</div>
        </div>
        {productData.promotion ? (
          <div className="flex gap-3 items-center">
            <div className="line-through">{productData.price} €</div>
            <div className="text-red-600 text-xl">{productData.promotion} €</div>
          </div>
        ) : (
          <div>{productData.price} €</div>
        )}
      </div>
    </div>
  )
}

export default ProductOrder
