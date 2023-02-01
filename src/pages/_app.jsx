import NavMenu from "@/components/home/NavMenu"
import Head from "next/head"
import "./styles.css"

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
          rel="stylesheet"
        />
        <title>Airnes</title>
      </Head>
      <NavMenu />
      <Component {...pageProps} />
    </>
  )
}

export default App
