import Button from "@/components/app/ui/Button"
import { NavLink } from "@/components/utils/NavLink"
import useAppContext from "@/web/hooks/useAppContext"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import { useEffect, useState } from "react"

export const getServerSideProps = async (context) => {
  const { payment_intent, redirect_status, address_id } = context.query
  const { locale } = context

  const translations = await serverSideTranslations(locale, [
    "confirmation",
    "navbar",
    "footer",
  ])

  return {
    props: {
      payment_intent,
      redirect_status,
      address_id,
      ...translations,
    },
  }
}

const Confirmation = (props) => {
  const {
    state: { cartItems },
    actions: { confirmOrder, clearCart },
  } = useAppContext()
  const { payment_intent, redirect_status, address_id } = props

  const [orderId, setOrderId] = useState(null)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const data = await confirmOrder(
        payment_intent,
        redirect_status,
        cartItems,
        address_id
      )
      await clearCart()

      setOrderId(data[1].result)
      setUserId(data[1].userId)
    }

    if (cartItems.length != 0) {
      fetchData()
    }
  }, [
    payment_intent,
    redirect_status,
    cartItems,
    confirmOrder,
    clearCart,
    address_id,
  ])

  const { t } = useTranslation("confirmation")

  return (
    <>
      <div className="flex justify-center items-center py-32">
        <div className="space-y-8 w-3/5 lg:w-1/4 lg:space-y-10">
          <h1 className="font-bold text-xl">{t(`confirm`)}</h1>
          <h2 className="font-bold text-lg">{t(`thanks`)}</h2>
          <p className="font-semibold">
            {t(`confirmNum`)}
            <NavLink href={`/user/${userId}/orders/${orderId}/order`}>
              <span className="font-medium underline">
                {payment_intent.substring(3)}
              </span>
            </NavLink>
            .
          </p>
          <NavLink href="/">
            <Button
              className="my-6 bg-[#615043] hover:bg-[#927864] hover:cursor-pointer
             active:bg-[#615043] border border-black p-3.5 font-semibold rounded-md px-12"
            >
              {t(`buttonText`)}
            </Button>
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default Confirmation
