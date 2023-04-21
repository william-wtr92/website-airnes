import Carousel from "@/components/app/ui/Carousel"
import HomepageCategories from "@/components/app/content/HomepageCategories"
import HomepageProducts from "@/components/app/content/HomepageProducts"
import SlideProducts from "@/components/app/content/SlideProducts"
import axios from "axios"
import routes from "@/web/routes"
import classNames from "classnames"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"

export const getServerSideProps = async ({ locale }) => {
  const { data } = await axios.get(
    `http://localhost:3000/api${routes.api.app.getProducts()}?sale=true&page=1`
  )

  const products = data.result

  return {
    props: {
      products: products,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  }
}

const Main = (props) => {
  const { products } = props
  const { t } = useTranslation("common")

  return (
    <>
      <main>
        <Carousel />
        <div className="flex flex-col gap-8">
          <div className="text-center text-[13px] font-bold lg:py-6 lg:text-xl">
            <p>
              {t("highlands")}
              <br />
              {t("ourFurniture")}
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
            <p>{t("popularProducts")}</p>
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
                {t("promotions")}
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
