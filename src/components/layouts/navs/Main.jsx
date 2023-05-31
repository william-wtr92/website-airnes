import {useRouter} from "next/router"
import Admin from "@/components/layouts/navs/admin/Admin"
import Users from "@/components/layouts/navs/Users"

const Main = (props) => {
  const { className } = props

  const router = useRouter()

  return router.pathname.startsWith("/admin") ? (
    <Admin/>
  ) : (
    <Users className={className}/>
  )
}

export default Main
