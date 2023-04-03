import Carousel from "@/components/app/ui/Carousel"
import Categories from "@/components/app/content/Categories"
import FooterMenu from "@/components/layouts/FooterMenu"
import Product from "@/components/app/content/Product"

const Main = () => {
  return (
    <>
      <main>
        <Carousel />
        <div className="text-center text-[13px] font-bold lg:py-6 lg:text-xl">
          <p>
            VENANT DES HAUTES TERRES D’ECOSSE
            <br />
            NOS MEUBLES SONT IMMORTELS
          </p>
        </div>
        <div className="flex flex-wrap justify-center">
          <div className="flex flex-wrap justify-center lg:justify-between lg:w-4/5">
            <Categories />
          </div>
        </div>
        <div className="flex justify-center py-10">
          <div className="flex flex-col items-center gap-10 w-[90%] lg:w-4/5">
            <h3 className="uppercase font-bold text-xl tracking-widest">
              Promotions
            </h3>
            <div className="overflow-x-auto scrollbar flex w-full gap-10 bg-gray-100 p-8">
              <Product />
            </div>
          </div>
        </div>
      </main>
      <FooterMenu position="relative" />
    </>
  )
}

export default Main
