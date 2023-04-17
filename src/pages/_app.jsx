import Head from "next/head"
import Layout from "@/components/layouts/Layout"
import "./styles.css"
import useAppContext, { AppContextProvider } from "@/web/hooks/useAppContext"

const App = ({ Component, pageProps }) => {
  const {
    state: { session, cartItems },
  } = useAppContext()

  return (
    <Layout session={session} cartItems={cartItems}>
      <Head>
        <title>Airneis</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

const SyncApp = (props) => {
  return (
    <AppContextProvider>
      <App {...props} />
    </AppContextProvider>
  )
}

export default SyncApp
