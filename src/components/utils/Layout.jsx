import { Montserrat } from "@next/font/google"
import NavMenu from "../home/NavMenu"

const montserrat = Montserrat({
  weight: "400",
  subsets: ["latin"],
})

const Layout = ({ children }) => {
  return (
    <div className={montserrat.className}>
      <NavMenu />
      {children}
    </div>
  )
}
export default Layout
