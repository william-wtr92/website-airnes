import Head from "next/head"
import Carousel from "@/components/Carousel"
import Categories from "@/components/Categories"
import FooterMenu from "@/components/FooterMenu"

const Main = () => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      </Head>
      <main>
        <Carousel />

        <div className="MainText flex flex-col text-[13px] font-bold items-center cursor-pointer py-6 lg:text-xl">
          <p>VENANT DES HAUTES TERRES D’ECOSSE NOS</p>
          <p>MEUBLES SONT IMMORTELS</p>
        </div>

        <Categories />
      </main>
      <FooterMenu position="relative" />
    </>
  )
}

export default Main
