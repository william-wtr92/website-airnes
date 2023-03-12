import Head from "next/head"
import Layout from "@/components/layouts/Layout"
import "./styles.css"
import { AppContextProvider } from "@/web/hooks/useAppContext"

const App = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Head>
        <title>Airnes</title>
      </Head>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </Layout>
  )
}

export default App
