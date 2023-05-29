import Button from "@/components/app/ui/Button"
import { NavLink } from "@/components/utils/NavLink"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import getApi from "@/web/getAPI"
import { getAuthorization } from "@/web/helper/getAuthorization"
import userDataServices from "@/web/services/user/userData"

export const getServerSideProps = async (context) => {
  const { req, query, locale } = context

  const redirect = getAuthorization("user", req, query)

  if (redirect) {
    return redirect
  }

  const api = getApi(context)

  const userData = userDataServices({ api })
  const [err, data] = await userData(query.userId)

  if (err) {
    return {
      redirect: {
        destination: "/",
      },
    }
  }

  return {
    props: {
      data,
      userId: query.userId,
      ...(await serverSideTranslations(locale, ["home", "navbar", "footer"])),
    },
  }
}

const UserHome = (props) => {
  const { data } = props

  const { userId } = props

  const { t } = useTranslation("home")

  return (
    <>
      <div className="gap-16 flex flex-col justify-center mx-6 mt-20 py-10 px-10 lg:w-[450px] lg:py-16 lg:mx-auto  lg:mt-28">
        <div className="text-center text-3xl text-black">
          {t(`hello`)} {data.result.name}
        </div>
        <NavLink href={`/user/${userId}/orders`}>
          <Button className="w-full rounded-2xl whitespace-normal tracking-normal">
            {t(`myOrder`)}
          </Button>
        </NavLink>
        <NavLink href={`/user/${userId}/settings`}>
          <Button className="w-full rounded-2xl">{t(`personalInfo`)}</Button>
        </NavLink>
      </div>
    </>
  )
}

export default UserHome
