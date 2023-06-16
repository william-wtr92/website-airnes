import getApi from "@/web/getAPI"
import { getAuthorization } from "@/web/helper/getAuthorization"
import orderDataServices from "@/web/services/user/order/orderData"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import ReturnForm from "@/components/app/content/ReturnForm"
import useAppContext from "@/web/hooks/useAppContext"
import { useRouter } from "next/router"

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

const Return = (props) => {
  const { data, productData } = props

  const { t } = useTranslation("orders")

  const {
    actions: { returnProduct }
  } = useAppContext()

  const router = useRouter()

  const handlePost = (returnData) => {
    returnData.products.map((item) => {
      item.selected && returnProduct({
        orderId: data.id,
        product_id: item.product_id,
        reason: item.reason,
        userId: data.user_id
      })
    })

    router.push(`/user/${data.user_id}/orders/${data.id}/order`)
  }

  return (
    <div className="py-20 flex flex-col items-center gap-10">
      <div className="flex flex-col gap-5 items-center">
        <h1 className="text-bold text-xl">{t("order")} #{data.id}</h1>
        <h2 className="text-">{t(`${data.status}`)}</h2>
      </div>
      <ReturnForm
        onSubmit={handlePost}
        products={productData}
        t={t}
      />
    </div>
  )
}

export default Return
