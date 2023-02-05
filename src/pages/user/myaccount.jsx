import FooterMenu from "@/components/home/FooterMenu"
import Button from "@/components/utils/Button"
import { NavLink } from "@/components/utils/NavLink"

const OnMyAccount = () => {
  return (
    <>
      <div className="gap-16 flex flex-col justify-center mx-6 mt-20 py-10 px-10 lg:w-[450px] lg:py-16 lg:mx-auto  lg:mt-28">
        <div className="text-center text-3xl text-black">
          Bonjour (Surname and Name)
        </div>
        <NavLink href="/user/userId/orders">
          <Button className="w-full rounded-2xl">MES COMMANDES</Button>
        </NavLink>
        <NavLink href="/">
          <Button className="w-full rounded-2xl">
            MES INFORMATIONS PERSONELLES
          </Button>
        </NavLink>
      </div>
      <FooterMenu position="absolute" />
    </>
  )
}

export default OnMyAccount
