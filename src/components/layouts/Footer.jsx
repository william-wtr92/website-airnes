import { useRouter } from "next/router"
import UserFooter from "./navs/UserFooter"

const Footer = () => {
  const router = useRouter()

  return !router.pathname.startsWith("/admin") ? <UserFooter /> : ""
}

export default Footer
