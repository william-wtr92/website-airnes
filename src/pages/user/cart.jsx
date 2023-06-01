import Button from "@/components/app/ui/Button"
import { TrashIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/solid"
import { NavLink } from "@/components/utils/NavLink"
import Image from "next/image"
import { useMediaQuery } from "react-responsive"
import { useCallback } from "react"
import useAppContext from "@/web/hooks/useAppContext"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export const getServerSideProps = async (context) => {
  const { locale } = context

  return {
    props: {
      ...(await serverSideTranslations(locale, ["cart", "navbar", "footer"])),
    },
  }
}

const Cart = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1000px)" })

  const {
    state: { session, cartItems },
    actions: { removeFromCart, updateCartQuantity },
  } = useAppContext()

  const total =
    cartItems?.reduce(
      (acc, item) => acc + item.price * item.product_quantity,
      0
    ) || 0

  const tax = total * 0.2

  const handleRemoveFromCart = useCallback(
    (productId) => {
      removeFromCart(productId)
    },
    [removeFromCart]
  )

  const handleQuantityChange = useCallback(
    (productId, newQuantity) => {
      const item = cartItems.find((item) => item.id === productId)

      if (newQuantity > parseInt(item.quantity, 10)) {
        newQuantity = parseInt(item.quantity, 10)
      }

      updateCartQuantity(productId, newQuantity)
    },
    [cartItems, updateCartQuantity]
  )

  const handleIncrement = useCallback(
    (productId) => {
      const item = cartItems.find((item) => item.id === productId)
      const newQuantity = parseInt(item.product_quantity, 10) + 1

      if (newQuantity > parseInt(item.quantity, 10)) {
        return
      }

      updateCartQuantity(productId, newQuantity)
    },
    [cartItems, updateCartQuantity]
  )

  const handleDecrement = useCallback(
    (productId) => {
      const item = cartItems.find((item) => item.id === productId)
      const newQuantity = parseInt(item.product_quantity, 10) - 1

      if (newQuantity < 1) {
        return
      }

      updateCartQuantity(productId, newQuantity)
    },
    [cartItems, updateCartQuantity]
  )

  const { t } = useTranslation("cart")

  return (
    <>
      <div className="min-h-screen">
        <div className="flex justify-center my-8 lg:my-16">
          <h1 className="font-bold text-2xl hover:cursor-pointer hover:text-[#615043] lg:mr-14 lg:text-4xl">
            {t(`mycart`)}
          </h1>
        </div>

        <div className="flex flex-col md:flex-col lg:flex-col xl:flex-row">
          {cartItems.length === 0 ? (
            <div className="flex justify-center lg:mt-10 xl:w-1/2">
              <NavLink href="/products/search">
                <Image
                  src="https://airnes.blob.core.windows.net/airnes/empty-cart.png?sp=r&st=2023-05-27T13:50:26Z&se=2023-11-15T22:50:26Z&sv=2022-11-02&sr=b&sig=4lxOHT795DIMUuHKWsmVELm2nYortbXeJDj9B9VIelE%3D"
                  alt="emptycart"
                  className="w-full h-60 object-cover hover:scale-105"
                  width={500}
                  height={500}
                />
              </NavLink>
            </div>
          ) : (
            <div className="flex flex-col justify-center xl:justify-start">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-center mb-4">
                  <div className="flex shadow-xl bg-[#fff] mx-auto w-[300px] justify-start px-4 py-2 lg:w-[550px] lg:mx-36">
                    <div className="flex mt-2 lg:items-center lg:mt-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={1}
                        className="w-20 object-cover h-20 lg:h-24 lg:w-28 hover:cursor-pointer"
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
                        max={parseInt(item.quantity, 10)}
                        className="w-12 h-6 border-2 rounded-md pl-2 mb-2 lg:mb-4"
                        value={item.product_quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            parseInt(e.target.value)
                          )
                        }
                      />

                      <div className="flex flex-col gap-2">
                        {isMobile ? (
                          <div className="w-10 relative left-4">
                            <PlusIcon
                              className="h-4"
                              onClick={() => handleIncrement(item.id)}
                            />
                            <MinusIcon
                              className="h-4"
                              onClick={() => handleDecrement(item.id)}
                            />
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="w-10 relative left-4">
                          <TrashIcon
                            className="h-6 hover:cursor-pointer hover:text-[#927864]"
                            onClick={() => handleRemoveFromCart(item.id)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div>
            <div className="flex flex-col items-center mt-10">
              <div className="grid grid-cols-2 w-64 lg:w-96">
                <p className="font-bold text-md lg:text-xl">{t(`total`)}</p>
                <p className="font-bold text-md flex justify-end lg:text-xl ">
                  {total.toFixed(2)} €
                </p>
                <p className="ml-2">{t(`tva`)}</p>
                <p className="flex justify-end mr-2">{tax.toFixed(2)} €</p>
              </div>
              <div className="my-6">
                <Button
                  className="bg-[#615043] hover:bg-[#927864] hover:cursor-pointer
           active:bg-[#615043] border border-black px-10 lg:px-24 py-4 font-semibold rounded-md text-[#fff]"
                >
                  <NavLink
                    href={
                      session
                        ? `/payment/${session.user.id}/checkout`
                        : `/user/login`
                    }
                  >
                    {t(`command`)}
                  </NavLink>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
