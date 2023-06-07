import Carousel from "@/components/app/ui/Carousel"
import HomepageCategories from "@/components/app/content/HomepageCategories"
import HomepageProducts from "@/components/app/content/HomepageProducts"
import SlideProducts from "@/components/app/content/SlideProducts"
import classNames from "classnames"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import getApi from "@/web/getAPI"
import getImageServices from "@/web/services/admin/homepage/getImages"
import getSelectCategoryServices from "@/web/services/admin/homepage/getSelectCategory"
import getSelectProductsServices from "@/web/services/admin/homepage/getSelectProducts"
import getProductsServices from "@/web/services/app/products/getProducts"

export const getServerSideProps = async (context) => {
  const { locale } = context

  const api = getApi(context)

  const getImage = getImageServices({ api })
  const getSelectCategory = getSelectCategoryServices({ api })
  const getSelectProducts = getSelectProductsServices({ api })
  const getProducts = getProductsServices({ api })

  const [errCarouselQuery, carouselQuery] = await getImage()
  const [errCategoryQuery, categoryQuery] = await getSelectCategory()
  const [errProductQuery, productQuery] = await getSelectProducts()
  const [errSaleQuery, saleQuery] = await getProducts(true, 1)

  if (errCarouselQuery || errCategoryQuery || errProductQuery || errSaleQuery) {
    return {
      redirect: {
        destination: "/categories/all",
      },
    }
  }

  return {
    props: {
      carousel: carouselQuery.result,
      products: productQuery.result,
      categories: categoryQuery.result,
      sales: saleQuery.result,
      ...(await serverSideTranslations(locale, ["common", "footer", "navbar"])),
    },
  }
}

const Main = (props) => {
  const { carousel, products, categories, sales } = props
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
              <HomepageCategories categories={categories} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="text-center text-[13px] font-bold lg:py-6 lg:text-xl">
            <p>{t("popularProducts")}</p>
          </div>
          <div className="flex flex-wrap justify-center">
            <div className="flex flex-wrap justify-center lg:justify-between">
              <HomepageProducts products={products} />
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
                  sales.length < 3 && "justify-center"
                )}
              >
                {sales.map((product) => (
                  <div
                    key={product.id}
                    className="flex-none w-full md:w-1/2 lg:w-1/3"
                  >
                    <SlideProducts
                      image={product.image[0].url}
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
