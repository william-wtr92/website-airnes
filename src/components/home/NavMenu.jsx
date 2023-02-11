import { useRouter } from "next/router"
import NavMenuAdmin from "./NavMenuAdmin"
import NavMenuUsers from "@/components/home/NavMenuUsers"

const NavMenu = () => {
  const router = useRouter()

  return !router.pathname.startsWith("/admin") ? (
    <NavMenuUsers/>
    ) : (
    <NavMenuAdmin />
  )
}

export default NavMenu
