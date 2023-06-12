import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import { arrayValidator } from "@/components/validation/validation"
import auth from "@/api/middlewares/auth"
const stripe = require("stripe")(process.env.SK_STRIPE)

const handler = mw({
  POST: [
    auth("user"),
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
          return accumulator + (element.promotion || element.price) * element.product_quantity
        }, 0)

        return totalPrice
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items) * 100,
        currency: "eur",
        payment_method_types: ["card"],
      })

      res.send({
        clientSecret: paymentIntent.client_secret,
        price: calculateOrderAmount(items),
      })
    },
  ],
})

export default handler
