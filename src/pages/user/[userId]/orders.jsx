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

  const formatDate = (date) => {
    return format(new Date(date), "yyyy-MM-dd")
  }

  return (
    <>
      <div className="flex flex-col items-center gap-10 pt-10">
        <h1 className="font-bold text-2xl uppercase">
          {t("orders")}
        </h1>
        <div className="flex flex-col items-center md:w-3/4 lg:w-3/5">
          {data.length === 0 ? (
            <p className="text-xl">
              {t("noOrder")}.
            </p>
          ) : data.map((data, i) => (
            <div
              className="flex flex-col lg:flex-row lg:justify-between lg:flex-row gap-5 border-b border-primary p-6 w-full"
              key={i}
            >
              <div>
                <p className="font-bold hover:text-primary lg:text-xl">
                  {formatDate(data.created_at)}
                </p>
                <NavLink href={`/user/${userId}/orders/${data.id}/order`}>
                  <div className="hover:cursor-pointer hover:text-primary">
                    #{data.payment_intent.substring(3)}
                  </div>
                </NavLink>
              </div>
              <div className="flex flex-col justify-start lg:items-end">
                <div className="font-bold text-xl">
                  {t(`${data.status}`)}
                </div>
                <p className="font-bold">{data.price} €</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Orders
