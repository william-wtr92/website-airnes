import ProductOrder from "@/components/app/content/ProductOrder"
import getApi from "@/web/getAPI"
import { getAuthorization } from "@/web/helper/getAuthorization"
import orderDataServices from "@/web/services/user/order/orderData"

export const getServerSideProps = async (context) => {
  const { req, query } = context

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

  return { props: { data: data.result[0], productData: data.product } }
}

const Order = (props) => {
  const { data, productData } = props

  return (
    <>
      <main>
        <div>
          <div className="flex justify-center mx-6 my-8 lg:my-16">
            <h1 className="font-bold text-2xl hover:cursor-pointer hover:text-[#615043] lg:mr-14 lg:text-4xl">
              Commande {data.payment_intent.substring(3)} - {data.date} -
              {data.status}
            </h1>
          </div>

          <div className="grid lg:grid-cols-2 mb-10 ">
            <div className="flex flex-col w-full md:px-[30%] lg:px-[20%] gap-6 mb-10">
              {productData.map((val) => (
                <ProductOrder
                  key={val.productData.id}
                  image={val.productData.image}
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
                    <p className="font-bold text-md lg:text-2xl">TOTAL</p>
                    <p className="font-bold text-md lg:text-2xl ">
                      {data.price} €
                    </p>
                  </div>
                  <div className="flex place-content-between">
                    <p className="text-gray-500 text-md lg:text-xl">TVA</p>
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
                    Adresse de livraison
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
                  Méthode de paiement
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
