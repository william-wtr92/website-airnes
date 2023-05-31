import OrderModel from "@/api/db/models/OrderModel"
import OrderProductModel from "@/api/db/models/OrderProductModel"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  arrayValidator,
  numberValidator,
  stringValidator,
} from "@/components/validation/validation"
import { getSessionFromCookiesServ } from "@/web/helper/getSessionFromCookiesServ"
import auth from "@/api/middlewares/auth"

const handler = mw({
  POST: [
    auth("user"),
    validate({
      body: {
        payment_intent: stringValidator.required(),
        redirect_status: stringValidator.required(),
        cartItems: arrayValidator.required(),
        address_id: numberValidator.required(),
      },
    }),
    async ({
      req,
      locals: {
        body: { payment_intent, redirect_status, cartItems, address_id },
      },
      res,
    }) => {
      const sessionFromCookies = getSessionFromCookiesServ(req)

      const id = sessionFromCookies.user.id

      const order = await OrderModel.query().insertAndFetch({
        user_id: id,
        address_id,
        payment_state: redirect_status,
        payment_intent,
      })

      cartItems.forEach(async (element) => {
        await OrderProductModel.query().insertAndFetch({
          order_id: order.id,
          product_id: element.id,
        })
      })

      res.send({
        result: true,
      })
    },
  ],
})

export default handler
