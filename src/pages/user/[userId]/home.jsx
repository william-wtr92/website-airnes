import FooterMenu from "@/components/layouts/FooterMenu"
import Button from "@/components/app/ui/Button"
import { NavLink } from "@/components/utils/NavLink"
import {useRouter} from "next/router"
import {useEffect} from "react"
import config from "@/web/config"
import parseSession from "@/web/parseSession"
import axios from "axios"
import routes from "@/web/routes"

export const getServerSideProps = async (context) => {
  const { query } = context

  const { data } = await axios.get(
      `http://localhost:3000/api${routes.api.userInfo.usesrData(query)}`
  )

  return {
    props: {
      data: data,
      userId: query.userId,
    },
  }
}
const UserHome = (props) => {
  const { data, userId } = props

  const router = useRouter()
  useEffect(() => {
    const jwt = localStorage.getItem(config.session.localStorageKey)

    const session = parseSession(jwt)

    if (session.user.id != userId) {
      router.push("/")
    }
  }, [userId, router])


  return (
      <>
        <div className="gap-16 flex flex-col justify-center mx-6 mt-20 py-10 px-10 lg:w-[450px] lg:py-16 lg:mx-auto  lg:mt-28">
          <div className="text-center text-3xl text-black">
            Bonjour {data.result.name}
          </div>
          <NavLink href="/user/userId/orders">
            <Button className="w-full rounded-2xl">MES COMMANDES</Button>
          </NavLink>
          <NavLink href="/user/userId/settings">
            <Button className="w-full rounded-2xl">
              MES INFORMATIONS PERSONELLES
            </Button>
          </NavLink>
        </div>
        <FooterMenu position="absolute" />
      </>
  )
}

export default UserHome
