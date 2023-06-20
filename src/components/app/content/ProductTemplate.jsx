import Image from "next/image"
import { useEffect, useState } from "react"
import { NavLink } from "@/components/utils/NavLink"

const ProductTemplate = (props) => {
  const { product } = props

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [product])

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 justify-center items-center h-72 lg:h-96">
        <div className="animate-spin w-8 h-8 border-t-2 border-transparent border-primary rounded-full"></div>
        <p className="font-bold">Loading ...</p>
      </div>
    )
  }

  return (
    <>
      <NavLink
        key={product.id}
        href={`/products/${product.id}/product`}
      >
        <div className="md:w-80">
          <Image
            src={product.image[0].url}
            alt={product.name}
            className="object-cover h-52"
            width={500}
            height={500}
          />
          <div className="flex flex-col">
            <h1 className="font-bold uppercase">{product.name}</h1>
            {product.promotion ? (
              <div className="flex gap-3">
                <p className="line-through font-bold">{product.price} €</p>
                <p className="text-red-600">{product.promotion} €</p>
              </div>
            ) : (
              <div>{product.price} €</div>
            )}
            <div className="text-xs text-justify">{product.description}</div>
          </div>
        </div>
      </NavLink>
    </>
  )
}

export default ProductTemplate