import { NavLink } from "@/components/utils/NavLink"
import getApi from "@/web/getAPI"
import { getAuthorization } from "@/web/helper/getAuthorization"
import getOrderServices from "@/web/services/user/getOrder"

export const getServerSideProps = async (context) => {
  const { req, query } = context

  const redirect = getAuthorization("user", req, query)

  if (redirect) {
    return redirect
  }

  const api = getApi(context)

  const getOrder = getOrderServices({ api })
  const [err, data] = await getOrder(query.userId)

  if (err) {
    return {
      redirect: {
        destination: "/",
      },
    }
  }

  return { props: { data: data.result, userId: query.userId } }
}

const Orders = (props) => {
  const { data, userId } = props

  return (
    <>
      <main>
        <div>
          <div className="flex justify-center my-12 lg:my-16">
            <h1 className="font-bold text-2xl hover:cursor-pointer hover:text-[#615043] lg:mr-14 lg:text-4xl">
              Mes Commandes
            </h1>
          </div>
          <div>
            <div className="flex items-center flex-col my-6">
              {data.map((data, i) => (
                <div
                  className="grid grid-cols-2 gap-8 my-6 shadow-xl shadow-[#dad0c9] rounded-md p-6 hover:cursor-pointer"
                  key={i}
                >
                  <NavLink href={`/user/${userId}/orders/${data.id}/order`}>
                    <p className="flex justify-start font-bold  hover:text-[#b3825c] lg:text-xl">
                      {data.date} - #{data.payment_intent.substring(3)}
                    </p>
                  </NavLink>
                  <p className="flex justify-end font-bold text-xl">
                    {data.status}
                  </p>
                  <p className=" font-bold">{data.price} €</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Orders
