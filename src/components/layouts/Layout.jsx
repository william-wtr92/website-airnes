import { Montserrat } from "@next/font/google"
import Main from "./navs/Main"

const montserrat = Montserrat({
  weight: "400",
  subsets: ["latin"],
})

const Layout = ({ children }) => {
  return (
    <div className={montserrat.className}>
      <Main />
      {children}
    </div>
  )
}
export default Layout
