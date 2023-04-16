import Carousel from "@/components/app/ui/Carousel"
import HomepageCategories from "@/components/app/content/HomepageCategories"
import HomepageProducts from "@/components/app/content/HomepageProducts"
import SlideProducts from "@/components/app/content/SlideProducts"
import axios from "axios"
import routes from "@/web/routes"
import classNames from "classnames"

export const getServerSideProps = async () => {
  const { data } = await axios.get(
    `http://localhost:3000/api${routes.api.app.getProducts()}?sale=true&page=1`
  )

  const products = data.result

  return {
    props: {
      products: products,
    },
  }
}

const Main = (props) => {
  const { products } = props

  return (
    <>
      <main>
        <Carousel />
        <div className="flex flex-col gap-8">
          <div className="text-center text-[13px] font-bold lg:py-6 lg:text-xl">
            <p>
              VENANT DES HAUTES TERRES D’ECOSSE
              <br />
              NOS MEUBLES SONT IMMORTELS
            </p>
          </div>
          <div className="flex flex-wrap justify-center">
            <div className="flex flex-wrap justify-center lg:justify-between">
              <HomepageCategories />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="text-center text-[13px] font-bold lg:py-6 lg:text-xl">
            <p>PRODUITS POPULAIRES</p>
          </div>
          <div className="flex flex-wrap justify-center">
            <div className="flex flex-wrap justify-center lg:justify-between">
              <HomepageProducts />
            </div>
          </div>
        </div>
        {products.length > 0 && (
          <div className="flex justify-center py-10">
            <div className="flex flex-col items-center gap-10 w-[80%]">
              <h3 className="uppercase font-bold text-xl tracking-widest">
                Promotions
              </h3>
              <div
                className={classNames(
                  "overflow-x-auto scrollbar w-full flex gap-10 p-4",
                  products.length < 3 && "justify-center"
                )}
              >
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex-none w-full md:w-1/2 lg:w-1/3"
                  >
                    <SlideProducts
                      image={product.image}
                      productId={product.id}
                      productName={product.name}
                      productPrice={product.price}
                      promotion={product.promotion}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  )
}

export default Main
