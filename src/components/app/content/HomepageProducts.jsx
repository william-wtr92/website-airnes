import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"
import routes from "@/web/routes"
import { NavLink } from "@/components/utils/NavLink"

const HomepageProducts = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(
        `http://localhost:3000/api${routes.api.admin.selectProduct.getSelectProducts()}`
      )

      const sortedProducts = data.result.sort((a, b) => a.order - b.order)

      setIsLoading(false)
      setProducts(sortedProducts)
    }

    fetchProducts()
  }, [])

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 justify-center items-center h-72 lg:h-96">
        <div className="animate-spin w-8 h-8 border-t-2 border-transparent border-primary rounded-full"></div>
        <p className="font-bold">Loading ...</p>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col gap-6 justify-center items-center h-72 lg:h-96">
        <div className="animate-spin w-8 h-8 border-t-2 border-transparent border-primary rounded-full"></div>
        <p className="font-bold">No products available !</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-8">
        {products.map((product) => (
          <NavLink
            key={product.user.id}
            href={`/products/${product.user.id}/product`}
          >
            <div className="h-64 w-80 hover:scale-105">
              <Image
                src={product.user.image}
                alt={product.user.name}
                className="object-cover h-52"
                width={500}
                height={500}
              />
              <div className="flex font-extrabold uppercase">
                <h1>{product.user.name}</h1>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </>
  )
}

export default HomepageProducts
