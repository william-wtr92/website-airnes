import Head from "next/head"
import Layout from "@/components/utils/Layout"
import "./styles.css"

const App = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Head>
        <title>Airnes</title>
      </Head>

      <Component {...pageProps} />
    </Layout>
  )
}

export default App
