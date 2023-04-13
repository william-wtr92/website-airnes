import { useRouter } from "next/router"
import Admin from "@/components/layouts/navs/admin/Admin"
import Users from "@/components/layouts/navs/Users"

const Main = ({ className }) => {
  const router = useRouter()

  return !router.pathname.startsWith("/admin") ? (
    <Users className={className} />
  ) : (
    <Admin />
  )
}

export default Main
