import React, { useState } from "react"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import Button from "../ui/Button"

export default function CheckoutForm(props) {
  const { price, dynamicPath } = props
  const stripe = useStripe()
  const elements = useElements()

  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${dynamicPath}payment/confirmation`,
      },
    })

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message)
    } else {
      setMessage("An unexpected error occurred.")
    }

    setIsLoading(false)
  }

  const paymentElementOptions = {
    layout: "tabs",
  }

  return (
    <form
      id="payment-form"
      className="max-w-md mx-auto xl:mt-52 mt-36 flex flex-col "
      onSubmit={handleSubmit}
    >
      <label className="mb-4 font-semibold">Prix: {price} $</label>
      <div className="mb-4">
        <PaymentElement id="payment-element" options={paymentElementOptions} />
      </div>
      <Button disabled={isLoading || !stripe || !elements} id="submit">
        Pay now
      </Button>
      {message && (
        <div id="payment-message" className="mt-4 text-red-500">
          {message}
        </div>
      )}
    </form>
  )
}
