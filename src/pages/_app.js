import FooterMenu from "@/components/FooterMenu"
import NavMenu from "@/components/NavMenu"
import Head from "next/head"
import "./styles.css"

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Airnes</title>
      </Head>
      <NavMenu />
      <Component {...pageProps} />
      <FooterMenu />
    </>
  )
}

export default App
