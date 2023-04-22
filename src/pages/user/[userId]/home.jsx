import Button from "@/components/app/ui/Button"
import { NavLink } from "@/components/utils/NavLink"
import axios from "axios"
import routes from "@/web/routes"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"

export const getServerSideProps = async (context) => {
  const { query, locale } = context

  const { data } = await axios.get(
    `http://localhost:3000/api${routes.api.user.userData(query.userId)}`
  )

  if (!data.result) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  const userId = query.userId

  return {
    props: {
      data,
      userId,
      ...(await serverSideTranslations(locale, ["home"])),
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
