import { Montserrat, WindSong } from "@next/font/google"
import Main from "./navs/Main"
import Footer from "./Footer"
import useAppContext from "@/web/hooks/useAppContext"
import Confirm from "@/components/app/ui/Confirm"
import { useEffect, useState } from "react"
import { useTranslation } from "next-i18next"

const montserrat = Montserrat({
  weight: "400",
  subsets: ["latin"]
})

const windsong = WindSong({
  weight: "400",
  subsets: ["latin"]
})

const Layout = (props) => {
  const { children } = props

  const {
    actions: { acceptCookies },
    state: { readCookie }
  } = useAppContext()

  const { t } = useTranslation("cookie")

  const [needToAcceptCookie, setAcceptedCookie] = useState(false)

  useEffect(() => {
    setAcceptedCookie(!readCookie)
  }, [readCookie])

  return (
    <>
      <Main
        className={windsong.className}
      />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          {
            needToAcceptCookie && (
              <Confirm
                className="z-50"
                useCase="cookie"
                action={acceptCookies}
                display={setAcceptedCookie}
                textValue={t("declare")}
              />
            )
          }
          <div className={montserrat.className}>{children}</div>
        </main>
      </div>
      <Footer/>
    </>
  )
}
export default Layout
