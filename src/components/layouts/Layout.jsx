import { Montserrat, WindSong } from "@next/font/google"
import Main from "./navs/Main"

const montserrat = Montserrat({
  weight: "400",
  subsets: ["latin"],
})

const windsong = WindSong({
  weight: "400",
  subsets: ["latin"],
})

const Layout = ({ children }) => {
  return (
    <>
      <Main className={windsong.className} />
      <div className={montserrat.className}>{children}</div>
    </>
  )
}
export default Layout
