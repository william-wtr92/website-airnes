import Head from "next/head"
import "./styles.css"
import useAppContext, { AppContextProvider } from "@/web/hooks/useAppContext"
import { appWithTranslation } from "next-i18next"
import Layout from "@/components/layouts/Layout"

const App = ({ Component, pageProps }) => {
  const {
    actions: { changeLanguage },
  } = useAppContext()

  return (
    <Layout>
      <Head>
        <title>Airneis</title>
      </Head>
      <Component {...pageProps} changeLanguage={changeLanguage} />
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
  } = useAppContext()

  return (
    <App
      {...props}
      changeLanguage={changeLanguage}
    />
  )
}

export default appWithTranslation(SyncApp)
