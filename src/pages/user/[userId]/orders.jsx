import { NavLink } from "@/components/utils/NavLink"
import getApi from "@/web/getAPI"
import { getAuthorization } from "@/web/helper/getAuthorization"
import getOrderServices from "@/web/services/user/getOrder"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import { format } from "date-fns"

export const getServerSideProps = async (context) => {
  const { req, query, locale } = context

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
        destination: "/"
      }
    }
  }

  return {
    props: {
      data: data.result,
      userId: query.userId,
      ...(await serverSideTranslations(locale, ["orders", "navbar", "footer"]))
    }
  }
}

const Orders = (props) => {
  const { data, userId } = props

  const { t } = useTranslation("orders")

  return (
    <>
      <main>
        <div>
          <div className="flex justify-center gap-5 p-20">
            <h1 className="font-bold text-2xl uppercase hover:cursor-pointer hover:text-primary">
              {t("orders")}
            </h1>
          </div>
          <div className="flex flex-col items-center gap-10">
            {data.length === 0 ? (
              <p className="text-xl">
                {t("noOrder")}.
              </p>
            ) : (
              data.map((data, i) => {
                const formatDate = format(
                  new Date(data.created_at),
                  "yyyy-MM-dd"
                )

                return (
                  <div
                    className="grid grid-cols-2 gap-8 my-6 shadow-xl shadow-[#dad0c9] rounded-md p-6 hover:cursor-pointer"
                    key={i}
                  >
                    <NavLink href={`/user/${userId}/orders/${data.id}/order`}>
                      <p className="flex justify-start font-bold hover:text-primary lg:text-xl">
                        {formatDate} - #{data.payment_intent.substring(3)}
                      </p>
                    </NavLink>
                    <p className="flex justify-end font-bold text-xl">
                      {t(`${data.status}`)}
                    </p>
                    <p className=" font-bold">{data.price} €</p>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default Orders
