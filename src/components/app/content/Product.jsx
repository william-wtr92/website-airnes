import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"
import routes from "@/web/routes"

const Product = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(
        `http://localhost:3000/api${routes.api.selectProduct.getSelectProducts()}`
      )

      const sortedProducts = data.result.sort((a, b) => a.order - b.order)

      setIsLoading(false)
      setProducts(sortedProducts)
    }

    fetchProducts()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (products.length === 0) {
    return <div>No products available</div>
  }

  return (
    <>
      <div>
        {products.map((product) => {
          return (
            <>
              <Image
                src={product.user.image}
                alt={product.user.name}
                className="border-2 border-black w-full h-60 object-cover"
                width={500}
                height={500}
              />
              <div className="flex justify-between font-extrabold uppercase p-1">
                <h1>{product.user.name}</h1>
                {product.user.promotion ? (
                  <div className="text-right">
                    <p className="line-through">{product.user.price} €</p>
                    <p className="text-red-600 text-lg">
                      {product.user.promotion} €
                    </p>
                  </div>
                ) : (
                  <p>{product.user.price} €</p>
                )}
              </div>
            </>
          )
        })}
      </div>
    </>
  )
}

export default Product
