import React, { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

import CheckoutForm from "@/components/app/cart/checkoutform"
import useAppContext from "@/web/hooks/useAppContext"

const stripePromise = loadStripe(
  "pk_test_51N1ln3IACBtQSJSw4YajhmK8NygdDj8YALH3jd1XBaVNX7SwjCfCSewi2emUg1iSqanX2TFsoPhzGzqKgAs06t9j00vAD1XTx4"
)

const Payment = () => {
  const {
    state: { cartItems },
    actions: { payment },
  } = useAppContext()

  const [clientSecret, setClientSecret] = useState("")

  useEffect(() => {
    async function fetchData() {
      const items = cartItems
      const paymentIntent = await payment(items)
      setClientSecret(paymentIntent[1].clientSecret)
    }

    if (cartItems.length != 0) {
      fetchData()
    }
  }, [payment, cartItems])

  const appearance = {
    theme: "stripe",
  }
  const options = {
    clientSecret,
    appearance,
  }

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}

export default Payment
