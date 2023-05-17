import {useEffect, useState} from "react"
import { FunnelIcon, AdjustmentsVerticalIcon } from "@heroicons/react/24/solid"
import config from "@/api/config"
import routes from "@/web/routes"
import {serverSideTranslations} from "next-i18next/serverSideTranslations"
import axios from "axios"
import ProductTemplate from "@/components/app/content/ProductTemplate"
import Filters from "@/components/app/find/Filters"
import {useRouter} from "next/router"
import PaginationProducts from "@/components/app/content/PaginationProducts"

export const getServerSideProps = async (context) => {
  const { locale } = context
  const { searchQuery, page } = context.query
  const search = searchQuery || ""
  const pageQuery = page || 1


    const [products,materialsAndCategories] = await Promise.all([
      axios.get(`${config.path}api${routes.api.app.products.searchProducts()}?page=${pageQuery}&search=${search}`),
      axios.get(`${config.path}api${routes.api.admin.materials.getMaterialsAndCategory()}`
      ),
    ])


    return {
      props: {
        ...(await serverSideTranslations(locale, [
          "products",
          "navbar",
          "footer",
        ])),
        products: products.data.result,
        pagination: products.data.pagination,
        categories: materialsAndCategories.data.categories,
        materials: materialsAndCategories.data.materials,
        query: {search, pageQuery}
      },
    }
}

const SearchPage = (props) => {
  const { products, categories, materials, pagination, query} = props

  const [filterShow, setFilterShow] = useState(false)

  const [searchQuery, setSearchQuery] = useState("")

  const router = useRouter()

  useEffect(() => {
    router.push({
      pathname: router.pathname,
      query: {...router.query, searchQuery, page: 1 },
    })
  }, [searchQuery])

  const handleShowFilter = () => {
    setFilterShow(!filterShow)
  }

  return (
    <>
      <div className="flex flex-rows">
        <div className={`${
            filterShow ? `block ` : `hidden`
          } flex flex-col border-r-2 p-4 fixed inset-0 top-[3.8125rem] left-[max(0px,calc(50%-45rem))] right-auto w-full md:w-[36%] pb-10 overflow-y-auto`}>
          <div className="flex justify-between pb-4">
            <button className="underline text-xl" onClick={handleShowFilter}>
              Réintialiser
            </button>
            <button className="underline text-xl" onClick={handleShowFilter}>
              Fermer
            </button>
          </div>
          <div className={`flex flex-col lg:flex-row justify-between mt-2`}>
            <div className="flex flex-col">
              <div className="font-bold pb-2 text-2xl text-black">
                Prix min €
              </div>
              <input
                className={` border rounded-full border-black bg-[#EDE5E0] text-black placeholder-[#443021] p-4 px-4 md:px-2 md:p-2 lg:px-4 lg:p-4`}
                type="search"
                placeholder=". . . €"
              />
            </div>
            <div className="flex flex-col">
              <div className="font-bold pb-2 text-2xl text-black">
                Prix max €
              </div>
              <input
                className={`border rounded-full border-black bg-[#EDE5E0] text-black placeholder-[#443021] p-4 px-4 md:px-2 md:p-2 lg:p-4 lg:px-4`}
                type="search"
                placeholder=". . . €"
              />
            </div>
          </div>
          <div
            id={"filtres"}
            className="flex flex-col gap-6 relative leading-6"
          >
            <Filters data={categories} name={"Catégories"} />
            <Filters data={materials} name={"Matériaux"} />
          </div>
        </div>
        <div
          className={`${
            filterShow
              ? `hidden md:ml-[36%] md:block w-full `
              : `block mx-auto w-full`
          } gap-4 flex flex-col justify-center mx-6 mt-20 pb-10 px-6  lg:mt-8`}
        >
          <div className="text-center text-3xl text-black font-bold pb-6">
            Recherche
          </div>
          <div className="flex justify-center gap-4">
            <div className="flex justify-center gap-4 ">
              <AdjustmentsVerticalIcon
                className=" h-10 w-10 color-[#615043]"
                onClick={handleShowFilter}
              />
              <div className="hidden md:block text-xl flex-none text-center">
                Filtrer
              </div>
              <div className="flex-1">
                <input
                  className={`pl-6 md:pr-[35%] border border-gray-500 bg-transparent text-black placeholder-[#443021] py-2`}
                  type="search"
                  placeholder="Rechercher"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="text-center text-3xl font-bold text-black mt-5">
            Résultat
          </div>
          <div className="text-center flex justify-center gap-2 mt-5">
            <FunnelIcon className="flex-none h-10 w-10 color-[#615043]" />
            Trier par : (asc)
          </div>
          <div className="flex flex-col items-center">
            <div
              className={`${
                filterShow ? `lg:grid-cols-2` : `lg:grid-cols-3`
              } w-5/6 grid gap-8 grid-cols-1 md:grid-cols-2 mb-20 mt-10 `}
            >
              {products
                  .map((product) => (
                      <ProductTemplate key={product.id} product={product}/>
                  ))}
            </div>
            {products.length === 0 && <div>AUNCUN RÉSULTAT</div>}
            {query.pageQuery === "1" ?
                (products.length === 18 &&
                    <PaginationProducts
                        totalPages={pagination.totalPages}
                        currentPage={pagination.page}
                    />
                ) :
                <PaginationProducts
                    totalPages={pagination.totalPages}
                    currentPage={pagination.page}
                />
            }
          </div>
        </div>
      </div>
    </>
  )
}
export default SearchPage
