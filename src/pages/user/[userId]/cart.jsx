import Button from "@/components/app/ui/Button"
import { TrashIcon } from "@heroicons/react/24/solid"
import { NavLink } from "@/components/utils/NavLink"
import Image from "next/image"
import axios from "axios"
import routes from "@/web/routes"
import { useCart } from "@/web/hooks/cart"

export const getServerSideProps = async (context) => {
  const { query } = context

  const { data } = await axios.get(
    `http://localhost:3000/api${routes.api.user.userData(query.userId)}`
  )

  if (!data.result) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  const userId = query.userId

  return {
    props: {
      data,
      userId,
    },
  }
}

const UserCart = () => {
  const { cartItems, total, tax, removeFromCart, updateQuantity } = useCart()

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId)
  }

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity)
  }

  return (
    <>
      <div>
        <div className="flex justify-center my-8 lg:my-16">
          <h1 className="font-bold text-2xl hover:cursor-pointer hover:text-[#615043] lg:mr-14 lg:text-4xl">
            Mon Panier
          </h1>
        </div>

        {cartItems.map((item) => (
          <div key={item.id} className="mb-4">
            <div className="flex shadow-xl bg-[#fff] mx-auto w-[300px] justify-start px-4 py-2 lg:w-[550px] lg:mx-36">
              <div className="flex mt-2 lg:items-center lg:mt-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={1}
                  className="w-20 h-20 lg:h-24 lg:w-28 hover:cursor-pointer"
                />
              </div>

              <div className="w-32 lg:w-1/2 lg:ml-10">
                <NavLink href={`/products/${item.id}/product`}>
                  <p className="text-sm mt-2 ml-4 font-bold hover:text-[#b3825c] lg:mt-0 lg:ml-0 lg:text-md">
                    {item.name}
                  </p>
                </NavLink>
                <p className="hidden text-sm mt-2 lg:block">
                  {item.description}
                </p>
              </div>
              <div className="flex flex-col relative left-5 lg:left-12">
                <p className="font-bold mb-2 lg:mb-2">{item.price} €</p>
                <input
                  type="number"
                  min="1"
                  className="w-12 h-6 border-2 rounded-md pl-2 mb-2 lg:mb-4"
                  value={item.product_quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, parseInt(e.target.value))
                  }
                />
                <div className="w-10 relative left-4">
                  <TrashIcon
                    className="h-6 hover:cursor-pointer hover:text-[#927864]"
                    onClick={() => handleRemoveFromCart(item.id)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        <div>
          <div className="flex flex-col items-center mt-10 lg:absolute lg:justify-end lg:top-60 lg:right-40 lg:mt-0">
            <div className="grid grid-cols-2 w-64 lg:w-96">
              <p className="font-bold text-md lg:text-xl">TOTAL</p>
              <p className="font-bold text-md flex justify-end lg:text-xl ">
                {total.toFixed(2)} €
              </p>
              <p className="ml-2">TVA</p>
              <p className="flex justify-end mr-2">{tax.toFixed(2)} €</p>
            </div>
            <div className="my-6">
              <Button
                className="bg-[#615043] hover:bg-[#927864] hover:cursor-pointer
             active:bg-[#615043] border border-black px-10 py-4 font-semibold rounded-md text-[#fff]"
              >
                <NavLink href="/payment/checkout">Passer la Commande</NavLink>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserCart
