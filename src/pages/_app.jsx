import Head from "next/head"
import Layout from "@/components/layouts/Layout"
import "./styles.css"
import useAppContext, { AppContextProvider } from "@/web/hooks/useAppContext"
import { appWithTranslation } from "next-i18next"

const App = ({ Component, pageProps, session, cartItems }) => {
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
      <AppWithAppContext {...props} />
    </AppContextProvider>
  )
}

const AppWithAppContext = (props) => {
  const {
    actions: { changeLanguage },
    state: { session, cartItems },
  } = useAppContext()

  return (
    <App
      {...props}
      session={session}
      cartItems={cartItems}
      changeLanguage={changeLanguage}
    />
  )
}

export default appWithTranslation(SyncApp)
