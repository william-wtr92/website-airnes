import NavMenu from "@/components/NavMenu"
import FooterMenu from "@/components/FooterMenu"
import CarouselMain from "@/components/Carousel"

const Main = () => {
  return (
    <>
      <NavMenu />
      <main>
        <CarouselMain />
      </main>
      <FooterMenu />
    </>
  )
}

export default Main
