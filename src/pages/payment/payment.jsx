import React, {useState, useEffect} from "react"
import {loadStripe} from "@stripe/stripe-js"
import {Elements} from "@stripe/react-stripe-js"
import CheckoutForm from "@/components/app/cart/checkoutform"
import useAppContext from "@/web/hooks/useAppContext"
import config from "@/api/config"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export const getServerSideProps = async (context) => {
  const { locale } = context

  const translations = await serverSideTranslations(locale, [
    "checkout",
    "navbar",
    "footer",
  ])

  const dynamicPath = `${config.path}${locale}/`

  return {
    props: {
<<<<<<< HEAD
      dynamicPath,
      ...translations,
    },
=======
      dynamicPath
    }
>>>>>>> main
  }
}

const stripePromise = loadStripe(
  "pk_test_51N1ln3IACBtQSJSw4YajhmK8NygdDj8YALH3jd1XBaVNX7SwjCfCSewi2emUg1iSqanX2TFsoPhzGzqKgAs06t9j00vAD1XTx4"
)

const Payment = (props) => {
  const { dynamicPath } = props
  const {
    state: { cartItems },
    actions: { payment }
  } = useAppContext()

  const [clientSecret, setClientSecret] = useState("")
  const [price, setPrice] = useState("")

  useEffect(() => {
    async function fetchData() {
      const items = cartItems
      const paymentIntent = await payment(items)
      setClientSecret(paymentIntent[1].clientSecret)
      setPrice(paymentIntent[1].price)
    }

    if (cartItems.length != 0) {
      fetchData()
    }
  }, [payment, cartItems])

  const appearance = {
    theme: "stripe"
  }
  const options = {
    clientSecret,
    appearance
  }

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm price={price} dynamicPath={dynamicPath}/>
        </Elements>
      )}
    </div>
  )
}

export default Payment
