import ProductOrder from "@/components/app/content/ProductOrder"
import getApi from "@/web/getAPI"
import { getAuthorization } from "@/web/helper/getAuthorization"
import orderDataServices from "@/web/services/user/order/orderData"
import { format } from "date-fns"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import Button from "@/components/app/ui/Button"
import useAppContext from "@/web/hooks/useAppContext"
import { useCallback, useState } from "react"

export const getServerSideProps = async (context) => {
  const { req, query, locale } = context

  const redirect = getAuthorization("user", req, query)

  if (redirect) {
    return redirect
  }

  const api = getApi(context)

  const orderData = orderDataServices({ api })
  const [err, data] = await orderData(query.userId, query.orderId)

  if (err) {
    return {
      redirect: {
        destination: "/"
      }
    }
  }

  return {
    props: {
      data: data.result[0],
      productData: data.product,
      ...(await serverSideTranslations(locale, ["orders", "navbar", "footer"]))
    }
  }
}

const Order = (props) => {
  const { data, productData } = props

  const [canBeCanceled, setCanBeCanceled] = useState(["pending", "delivering"].includes(data.status))
  const [status, setStatus] = useState(data.status)

  const {
    actions: { cancelOrder }
  } = useAppContext()

  const formatDate = format(new Date(data.created_at), "yyyy-MM-dd")

  const { t } = useTranslation("orders")

  const handleCancel = useCallback(
    (userId, orderId) => async () => {
      await cancelOrder(userId, orderId)

      setCanBeCanceled(false)
      setStatus("canceled")
    }, [cancelOrder])

  return (
    <div className="flex flex-col md:justify-center md:items-center gap-10 p-10">
      <div className="flex flex-col justify-center items-center gap-3">
        <h1 className="font-bold text-xl">
          {t("order")} {data.payment_intent.substring(3)}
        </h1>
        <div>{formatDate} - {t(`${status}`)}</div>
      </div>
      <div className="flex flex-col gap-5 md:w-1/2 py-5">
        {productData.map((val) => (
          <ProductOrder
            key={val.productData.id}
            product={val}
          />
        ))}
        {canBeCanceled && (
          <div className="flex justify-end">
            <Button
              variant="danger"
              onClick={handleCancel(data.user_id, data.id)}
            >
              {t("cancelOrder")}
            </Button>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <div className="flex place-content-between">
              <p className="font-bold text-md">
                {t("total")}
              </p>
              <p className="font-bold text-md">
                {data.price} €
              </p>
            </div>
            <div className="flex place-content-between">
              <p className="text-gray-500 text-md">
                {t("tva")}
              </p>
              <p className="text-gray-500 text-md">
                {(data.price * 0.2).toFixed(2)} €
              </p>
            </div>
          </div>
          <div
            className="border-b-black border-b"
          ></div>
          <div>
            <div className="flex flex-col gap-3">
              <p className="font-bold text-md">
                {t("delivery")}
              </p>
              <p className="text-gray-500">
                {data.addressData.lastName} {data.addressData.name}
              </p>
              <p className="text-gray-500">
                {data.addressData.address}
              </p>
              <p className="text-gray-500">
                {data.addressData.postal_code} {data.addressData.city}
              </p>
            </div>
          </div>
          <div
            className="border-b border-b-black"
          ></div>
          <div>
            <p className="font-bold text-md">
              {t("payment")}
            </p>
            <p className="text-gray-500">
              {data.payment_method}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order
