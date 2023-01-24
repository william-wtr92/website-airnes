import Head from "next/head"
import Carousel from "@/components/utils/Carousel"
import Categories from "@/components/home/Categories"
import FooterMenu from "@/components/home/FooterMenu"

const Main = () => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
          rel="stylesheet"
        />
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
