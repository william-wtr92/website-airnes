import {useEffect, useState} from "react"
import { FunnelIcon, AdjustmentsVerticalIcon } from "@heroicons/react/24/solid"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"
import ProductTemplate from "@/components/app/content/ProductTemplate"
import Filters from "@/components/app/find/Filters"
import { useRouter } from "next/router"
import Pagination from "@/components/app/ui/Pagination"
import getApi from "@/web/getAPI"
import searchProductsServices from "@/web/services/app/products/searchProducts"
import getFilterServices from "@/web/services/app/products/getFilter"

export const getServerSideProps = async (context) => {
  const { locale } = context
  const {
    searchQuery,
    page,
    promo,
    stock,
    category,
    material,
    order,
    minPrice,
    maxPrice,
  } = context.query
  const search = searchQuery || ""
  const pageQuery = page || 1
  const promoQuery = promo || false
  const stockQuery = stock || false
  const categoryQ = category || 0
  const materialQ = material || 0
  const orderQ = order || ""
  const minPriceQ = minPrice || 0
  const maxPriceQ = maxPrice || 0

  const api = getApi(context)

  const getFilter = getFilterServices({ api })
  const searchProducts = searchProductsServices({ api })

  const [errProducts, products] = await searchProducts(
    pageQuery,
    search,
    promoQuery,
    stockQuery,
    categoryQ,
    materialQ,
    orderQ,
    minPriceQ,
    maxPriceQ
  )
  const [errFilter, filter] = await getFilter()

  if (errProducts || errFilter) {
    return {
      redirect: {
        destination: "/",
      },
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["search", "navbar", "footer"])),
      products: products.result,
      pagination: products.pagination,
      categories: filter.categories,
      materials: filter.materials,
      query: { search, pageQuery, promoQuery, stockQuery, minPriceQ, maxPriceQ, categoryQ, materialQ, orderQ },
    },
  }
}

const SearchPage = (props) => {
  const { products, categories, materials, pagination, query } = props

  const [filterShow, setFilterShow] = useState(false)
  const [order, setOrder] = useState(query.orderQ)
  const [stock, setStock] = useState(query.stockQuery)
  const [promo, setPromo] = useState(query.promoQuery)
  const [isNearBottom, setIsNearBottom] = useState(false)
  const nbMaxProduct = 18

  const router = useRouter()

  const changePriceOrder = () => {
    setOrder(order === "asc" ? "desc" : "asc")
    router.push({
      pathname: router.pathname,
      query: { ...router.query, order: order, page: 1 },
    })
  }
  const filterEvent = (value, query) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, [query]: value, page: 1 },
    })
  }

  const filterStock = () => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, stock: !stock, page: 1 },
    })
    setStock(!stock)
  }
  const filterPromo = () => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, promo: !promo, page: 1 },
    })
    setPromo(!promo)
  }

  const handleShowFilter = () => {
    setFilterShow(!filterShow)
  }

  const resetFilter = () => {
    router.push(router.pathname)
    setStock(false)
    setPromo(false)
  }

  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.innerHeight + document.documentElement.scrollTop
      const scrollThreshold = document.documentElement.offsetHeight * 0.985
      setIsNearBottom(scrollPosition >= scrollThreshold)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const { t } = useTranslation("search")

  return (
    <>
      <form>
        <div className="flex flex-rows">
          <div
            className={`${
              filterShow ? `block` : `hidden`
            } flex flex-col border-r-2 p-4 fixed inset-x-0 ${isNearBottom? `bottom-14` : `bottom-0`} top-[3.8125rem] left-[max(0px,calc(50%-45rem))] right-auto w-full md:w-[36%] pb-10 overflow-y-scroll bg-white`}
          >
            <div className="flex justify-between pb-4">
              <button
                className="underline text-xl"
                onClick={resetFilter}
                type={"reset"}
              >
                {t("reset")}
              </button>
              <button
                type="button"
                className="underline text-xl"
                onClick={handleShowFilter}
              >
                {t("close")}
              </button>
            </div>
            <div className={`flex flex-col lg:flex-row justify-between mt-2`}>
              <div className="flex flex-col">
                <div className="font-bold pb-2 text-2xl text-black">
                  {t("min")}
                </div>
                <input
                  className={` border rounded-full border-black bg-[#EDE5E0] text-black placeholder-[#443021] p-4 px-4 md:px-2 md:p-2 lg:px-4 lg:p-4`}
                  type="number"
                  placeholder={t("minPlaceholder")}
                  defaultValue={query.minPriceQ}
                  onChange={(e) => filterEvent(e.target.value, "minPrice")}
                />
              </div>
              <div className="flex flex-col">
                <div className="font-bold pb-2 text-2xl text-black">
                  {t("max")}
                </div>
                <input
                  className={` border rounded-full border-black bg-[#EDE5E0] text-black placeholder-[#443021] p-4 px-4 md:px-2 md:p-2 lg:px-4 lg:p-4`}
                  type="number"
                  placeholder={t("maxPlaceholder")}
                  defaultValue={query.maxPriceQ}
                  onChange={(e) => filterEvent(e.target.value, "maxPrice")}
                />
              </div>
            </div>
            <div
              id={"filtres"}
              className="flex flex-col gap-6 relative leading-6 lg:pr-20"
            >
              <section className="filters" aria-labelledby="filters-header">
                <header
                  id="filters-header"
                  className=" font-bold text-black text-xl py-6"
                >
                  {t("option")}
                </header>
                <label className="text-black font-bold text-md flex content-center gap-4 text-xl pb-4 pl-4">
                  <input
                    type="checkbox"
                    checked={stock}
                    className="border border-black w-[25px] h-[25px]"
                    onChange={filterStock}
                  />
                  {t("stock")}
                </label>
                <label className="text-black font-bold text-md flex content-center gap-4 text-xl pb-4 pl-4">
                  <input
                    type="checkbox"
                    checked={promo}
                    className="border border-black w-[25px] h-[25px]"
                    onChange={filterPromo}
                  />
                  {t("promo")}
                </label>
              </section>
              <Filters
                  defaultValue={query.categoryQ}
                data={categories}
                name={t("categories")}
                handleClick={filterEvent}
                query={"category"}
              />
              <Filters
                  defaultValue={query.materialQ}
                data={materials}
                name={t("materials")}
                handleClick={filterEvent}
                query={"material"}
              />
            </div>
          </div>
          <div
            className={`${
              filterShow
                ? `md:ml-[36%] md:block w-full mr-0`
                : `mx-auto w-full`
            } gap-4 flex flex-col justify-center mx-6 mt-20 pb-10 px-6 lg:mt-8 overflow-y-auto`}
          >
            <div className="text-center text-3xl text-black font-bold pb-6">
              {t("search")}
            </div>
            <div className="flex justify-center gap-4">
              <div className="flex justify-center gap-4 ">
                <AdjustmentsVerticalIcon
                  className=" h-10 w-10 color-[#615043]"
                  onClick={handleShowFilter}
                />
                <div className="hidden md:block text-xl flex-none text-center">
                  {t("filter")}
                </div>
                <div className="flex-1">
                  <input
                    className={`pl-6 lg:pr-[35%] border border-gray-500 bg-transparent text-black placeholder-[#443021] py-2`}
                    type="search"
                    placeholder={t("searchPlaceholder")}
                    defaultValue={query.search}
                    onChange={(e) => filterEvent(e.target.value, "searchQuery")}
                  />
                </div>
              </div>
            </div>
            <div className="text-center text-3xl font-bold text-black mt-5">
              {t("result")}
            </div>
            <div className="text-center flex justify-center gap-2 mt-5">
              <FunnelIcon
                className={`${
                  order === "asc" ? "" : "rotate-180 "
                }flex-none h-10 w-10 color-[#615043]`}
                onClick={changePriceOrder}
              />
              {t("asc")} / ({order? order : "desc"})
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`${
                  filterShow ? `lg:grid-cols-2 md:grid-cols-1` : `lg:grid-cols-3`
                } md:w-5/6 w-[90%] grid gap-8 grid-cols-1 md:grid-cols-2 mb-20 mt-10 `}
              >
                {products.map((product) => (
                  <ProductTemplate key={product.id} product={product} />
                ))}
              </div>
              {products.length === 0 && <div>{t("noresult")}</div>}
              {query.pageQuery === "1" ? (
                products.length === nbMaxProduct && (
                  <Pagination
                    totalPages={pagination.totalPages}
                    currentPage={pagination.page}
                  />
                )
              ) : (
                <Pagination
                  totalPages={pagination.totalPages}
                  currentPage={pagination.page}
                />
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
export default SearchPage
