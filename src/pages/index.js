import Carousel from "@/components/app/ui/Carousel"
import HomepageCategories from "@/components/app/content/HomepageCategories"
import HomepageProducts from "@/components/app/content/HomepageProducts"
import SlideProducts from "@/components/app/content/SlideProducts"
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
        destination: "/categories/all"
      }
    }
  }

  return {
    props: {
      carousel: carouselQuery.result,
      products: productQuery.result,
      categories: categoryQuery.result,
      sales: saleQuery.result,
      ...(await serverSideTranslations(locale, ["common", "footer", "navbar"]))
    }
  }
}

const Main = (props) => {
  const { carousel, products, categories, sales } = props
  const { t } = useTranslation("common")

  return (
    <>
      <main>
        {carousel.length > 0 && (
          <Carousel data={carousel}/>
        )}
        <div className="flex flex-col gap-10 py-5">
          <div className="flex flex-col gap-8">
            <div className="text-center text-[13px] font-bold lg:text-xl">
              <p>
                {t("highlands")}
                <br/>
                {t("ourFurniture")}
              </p>
            </div>
            {categories.length > 0 && (
              <div className="flex flex-wrap justify-center">
                <div className="flex flex-wrap justify-center lg:justify-between">
                  <HomepageCategories categories={categories}/>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-8">
            <div className="text-center text-[13px] font-bold lg:text-xl">
              <p>{t("popularProducts")}</p>
            </div>
            {products.length > 0 && (
              <div className="flex flex-wrap justify-center">
                <div className="flex flex-wrap justify-center lg:justify-between">
                  <HomepageProducts products={products}/>
                </div>
              </div>
            )}
          </div>
          {sales.length > 0 && (
            <div className="flex justify-center">
              <div className="flex flex-col items-center gap-8 w-[80%]">
                <h3 className="uppercase font-bold text-xl tracking-widest">
                  {t("promotions")}
                </h3>
                <SlideProducts products={sales}/>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default Main
