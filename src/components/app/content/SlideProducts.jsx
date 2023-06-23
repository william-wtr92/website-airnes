import Image from "next/image"
import { NavLink } from "@/components/utils/NavLink"
import classNames from "classnames"

const SlideProducts = (props) => {
  const { products } = props

  return (
    <div
      className={classNames(
        "overflow-x-auto scrollbar w-full flex gap-10 p-4 bg-gray-100 rounded-lg",
        products.length < 3 && "justify-center"
      )}
    >
      {products.map((product) => (
        <div
          key={product.id}
          className="flex-none w-full md:w-1/2 lg:w-1/3"
        >
          <NavLink href={`/products/${product.id}/product`}>
            <Image
              src={product.image[0].url}
              alt={product.name}
              className="border border-black w-full h-60 object-cover"
              width={500}
              height={500}
            />
            <div className="flex flex-col font-extrabold uppercase p-1">
              <h1>{product.name}</h1>
              <div className="flex gap-5">
                <p className={classNames(product.promotion && "line-through")}>{product.price} €</p>
                {product.promotion &&
                  <p className="text-red-600">{product.promotion} €</p>
                }
              </div>
            </div>
          </NavLink>
        </div>
      ))}
    </div>
  )
}

export default SlideProducts
