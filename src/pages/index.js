import NavMenu from "@/components/NavMenu"
import FooterMenu from "@/components/FooterMenu"
import CarouselMain from "@/components/Carousel"
import Head from "next/head"

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
        <title>Airnes</title>
      </Head>
      <NavMenu />
      <main>
        <CarouselMain />
        <div className="MainText flex flex-col text-xl font-bold items-center justify-center cursor-pointer py-6">
          <p>VENANT DES HAUTES TERRES D’ECOSSE NOS</p>
          <p>MEUBLES SONT IMMORTELS</p>
        </div>
      </main>
      <FooterMenu />
    </>
  )
}

export default Main
