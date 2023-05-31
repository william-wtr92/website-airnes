import { Montserrat, WindSong } from "@next/font/google"
import Main from "./navs/Main"
import Footer from "./Footer"

const montserrat = Montserrat({
  weight: "400",
  subsets: ["latin"],
})

const windsong = WindSong({
  weight: "400",
  subsets: ["latin"],
})

const Layout = (props) => {
  const { children } = props

  return (
    <>
      <Main
        className={windsong.className}
      />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <div className={montserrat.className}>{children}</div>
        </main>
      </div>
      <Footer />
    </>
  )
}
export default Layout
