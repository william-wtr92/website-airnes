import { useRouter } from "next/router"
import Admin from "@/components/layouts/navs/admin/Admin"
import Users from "@/components/layouts/navs/Users"

const Main = ({ className, session }) => {
  const router = useRouter()

  return !router.pathname.startsWith("/admin") ? (
    <Users className={className} session={session} />
  ) : (
    <Admin />
  )
}

export default Main
