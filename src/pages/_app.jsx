import Head from "next/head"
import "./styles.css"
import useAppContext, { AppContextProvider } from "@/web/hooks/useAppContext"
import { appWithTranslation } from "next-i18next"
import Layout from "@/components/layouts/Layout"

const MyApp = ({ Component, pageProps }) => {
  const {
    actions: { changeLanguage },
  } = useAppContext()

  return (
    <Layout>
      <Head>
        <title>Airneis</title>
      </Head>
      <Component {...pageProps} changeLanguage={changeLanguage}/>
    </Layout>
  )
}

const AppWithAppContext = ({ Component, ...props }) => {
  return (
    <AppContextProvider>
      <MyApp Component={Component} {...props} />
    </AppContextProvider>
  )
}

export default appWithTranslation(AppWithAppContext)
