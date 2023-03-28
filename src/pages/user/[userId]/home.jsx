import FooterMenu from "@/components/layouts/FooterMenu"
import Button from "@/components/app/ui/Button"
import { NavLink } from "@/components/utils/NavLink"
import axios from "axios"
import routes from "@/web/routes"

export const getServerSideProps = async (context) => {
  const { query } = context

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

  return {
    props: {
      data: data,
    },
  }
}
const UserHome = (props) => {
  const { data } = props


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
