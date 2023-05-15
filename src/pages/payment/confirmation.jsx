import Button from "@/components/app/ui/Button"
import { NavLink } from "@/components/utils/NavLink"
import useAppContext from "@/web/hooks/useAppContext"
import { useEffect } from "react"

export const getServerSideProps = async (context) => {
  const { payment_intent, redirect_status } = context.query

  return {
    props: {
      payment_intent,
      redirect_status,
    },
  }
}

const Confirmation = (props) => {
  const {
    state: { cartItems },
    actions: { confirmOrder, clearCart },
  } = useAppContext()
  const { payment_intent, redirect_status } = props

  useEffect(() => {
    async function fetchData() {
      await confirmOrder(payment_intent, redirect_status, cartItems)
      await clearCart()
    }

    if (cartItems.length != 0) {
      fetchData()
    }
  }, [payment_intent, redirect_status, cartItems, confirmOrder, clearCart])

  return (
    <>
      <div className="flex justify-center items-center py-32">
        <div className="space-y-8 w-3/5 lg:w-1/4 lg:space-y-10">
          <h1 className="font-bold text-xl">Commande effectuée !</h1>
          <h2 className="font-bold text-lg">Merci pour votre achat.</h2>
          <p className="font-semibold">
            Votre commande a bien été enregistrée sous le numéro
            <span className="font-medium underline">
              {" "}
              {payment_intent.substring(3)}
            </span>
            .
          </p>
          <NavLink href="/">
            <Button
              className="my-6 bg-[#615043] hover:bg-[#927864] hover:cursor-pointer
             active:bg-[#615043] border border-black p-3.5 font-semibold rounded-md px-12"
            >
              Continuer mes achats
            </Button>
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default Confirmation
