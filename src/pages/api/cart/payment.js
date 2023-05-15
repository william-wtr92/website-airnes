import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { arrayValidator } from "@/components/validation/validation"
const stripe = require("stripe")(process.env.SK_STRIPE)

process.env.SK_STRIPE

const handler = mw({
  POST: [
    validate({
      body: {
        items: arrayValidator.required(),
      },
    }),
    async ({
      locals: {
        body: { items },
      },
      res,
    }) => {
      const calculateOrderAmount = (items) => {
        const totalPrice = items.reduce((accumulator, element) => {
          return accumulator + element.price * element.product_quantity
        }, 0)

        const finalPrice = totalPrice * 100

        return finalPrice
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "eur",
        payment_method_types: ["card"],
      })

      res.send({
        clientSecret: paymentIntent.client_secret,
      })
    },
  ],
})

export default handler
