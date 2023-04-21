import Head from "next/head"
import Layout from "@/components/layouts/Layout"
import "./styles.css"
import useAppContext, { AppContextProvider } from "@/web/hooks/useAppContext"
import { appWithTranslation, i18n } from "next-i18next"
import { useEffect } from "react"

const App = ({ Component, pageProps }) => {
  const {
    actions: { changeLanguage },
    state: { session, cartItems },
  } = useAppContext()

  useEffect(() => {
    i18n.on("languageChanged", (lang) => {
      changeLanguage(lang)
    })

    return () => {
      i18n.off("languageChanged")
    }
  }, [changeLanguage])

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
  return <App {...props} />
}

export default appWithTranslation(SyncApp)
