import ProductOrder from "@/components/app/content/ProductOrder"
import getApi from "@/web/getAPI"
import { getAuthorization } from "@/web/helper/getAuthorization"
import orderDataServices from "@/web/services/user/order/orderData"
import { format } from "date-fns"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"

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
        destination: "/",
      },
    }
  }

  return {
    props: {
      data: data.result[0],
      productData: data.product,
      ...(await serverSideTranslations(locale, ["orders", "navbar", "footer"])),
    },
  }
}

const Order = (props) => {
  const { data, productData } = props

  const formatDate = format(new Date(data.created_at), "yyyy-MM-dd")

  const { t } = useTranslation("orders")

  return (
    <>
      <main>
        <div>
          <div className="flex justify-center mx-6 my-8 lg:my-16">
            <h1 className="font-bold text-2xl hover:cursor-pointer hover:text-[#615043] lg:mr-14 lg:text-4xl">
              {t("order")} {data.payment_intent.substring(3)} - {formatDate} -{" "}
              {data.status}
            </h1>
          </div>

          <div className="grid lg:grid-cols-2 mb-10 ">
            <div className="flex flex-col w-full md:px-[30%] lg:px-[20%] gap-6 mb-10">
              {productData.map((val) => (
                <ProductOrder
                  key={val.productData.id}
                  image={val.productData.image[0].url}
                  name={val.productData.name}
                  price={val.productData.price}
                  quantity={val.product_quantity}
                />
              ))}
            </div>
            <div className="px-[20%] flex flex-col w-full ">
              <div id={"prix"}>
                <div className="flex flex-col">
                  <div className="flex place-content-between">
                    <p className="font-bold text-md lg:text-2xl">
                      {" "}
                      {t("total")}
                    </p>
                    <p className="font-bold text-md lg:text-2xl ">
                      {data.price} €
                    </p>
                  </div>
                  <div className="flex place-content-between">
                    <p className="text-gray-500 text-md lg:text-xl">
                      {" "}
                      {t("tva")}
                    </p>
                    <p className="text-gray-500 text-md lg:text-xl">
                      {(data.price * 0.2).toFixed(2)} €
                    </p>
                  </div>
                </div>
              </div>
              <div
                id={"divider"}
                className="border-b-black border-b my-10"
              ></div>
              <div id={"Adresse Livraison"}>
                <div className="flex flex-col">
                  <p className="font-bold text-md lg:text-2xl mb-3">
                    {t("delivery")}
                  </p>
                  <p className="lg:text-xl text-gray-500">
                    {data.addressData.lastName} {data.addressData.name}
                  </p>
                  <p className="lg:text-xl text-gray-500">
                    {data.addressData.address}
                  </p>
                  <p className="lg:text-xl text-gray-500">
                    {data.addressData.postal_code} {data.addressData.city}
                  </p>
                </div>
              </div>
              <div
                id={"divider"}
                className="border-b-black border-b my-5"
              ></div>
              <div id={"Méthode de payments"}>
                <p className="font-bold text-md lg:text-2xl mb-3">
                  {t("payment")}
                </p>
                <p className="lg:text-xl text-gray-500">
                  {data.payment_method}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Order
