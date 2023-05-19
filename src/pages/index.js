import Carousel from "@/components/app/ui/Carousel"
import HomepageCategories from "@/components/app/content/HomepageCategories"
import HomepageProducts from "@/components/app/content/HomepageProducts"
import SlideProducts from "@/components/app/content/SlideProducts"
import axios from "axios"
import routes from "@/web/routes"
import classNames from "classnames"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import config from "@/api/config"

export const getServerSideProps = async ({ locale }) => {
  const [productsRes, carouselRes, categoriesRes, selectedProductRes] =
    await Promise.all([
      axios.get(
        `${
          config.path
        }api${routes.api.app.products.getProducts()}?sale=true&page=1`
      ),
      axios.get(`${config.path}api${routes.api.admin.carousel.getImages()}`),
      axios.get(
        `${
          config.path
        }api${routes.api.admin.selectCategory.getSelectCategory()}`
      ),
      axios.get(
        `${config.path}api${routes.api.admin.selectProduct.getSelectProducts()}`
      ),
    ])

  const products = productsRes.data.result
  const carousel = carouselRes.data.result
  const categories = categoriesRes.data.result
  const selectedProduct = selectedProductRes.data.result

  return {
    props: {
      carousel: carousel,
      categories: categories,
      selectedProduct: selectedProduct,
      products: products,
      ...(await serverSideTranslations(locale, ["common", "footer", "navbar"])),
    },
  }
}

const Main = (props) => {
  const { products, carousel, categories, selectedProduct } = props
  const { t } = useTranslation("common")

  return (
    <>
      <main>
        <Carousel data={carousel} />
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
              <HomepageCategories data={categories} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="text-center text-[13px] font-bold lg:py-6 lg:text-xl">
            <p>{t("popularProducts")}</p>
          </div>
          <div className="flex flex-wrap justify-center">
            <div className="flex flex-wrap justify-center lg:justify-between">
              <HomepageProducts data={selectedProduct} />
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
