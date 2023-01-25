import NavMenu from "@/components/home/NavMenu"
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
    </>
  )
}

export default App
