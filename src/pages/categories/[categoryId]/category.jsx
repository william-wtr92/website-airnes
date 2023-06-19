import ProductThumbnail from "@/components/app/content/ProductThumbnail"
import Image from "next/image"
import { NavLink } from "@/components/utils/NavLink"
import Button from "@/components/app/ui/Button"

import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useTranslation } from "next-i18next"

import getApi from "@/web/getAPI"
import getCategoryServices from "@/web/services/app/categories/getCategory"

export const getServerSideProps = async (context) => {
  const { categoryId } = context.params
  const { locale } = context

  const api = getApi(context)

  const getCategory = getCategoryServices({ api })
  const [err, data] = await getCategory(categoryId)

  if (err) {
    return {
      props: {
        err: err
      }
    }
  }

  const categoryData = data.result

  const translations = await serverSideTranslations(locale, [
    "categories",
    "navbar",
    "footer"
  ])

  return {
    props: {
      category: categoryData,
      ...translations
    }
  }
}

const Category = (props) => {
  const { category, err } = props

  const products = category.products

  const { t } = useTranslation("categories")

  return (
    <>
      <div className="relative">
        <Image
          src={category.image}
          alt={category.name}
          className="w-full h-72 object-cover blur-[1px]"
          height={500}
          width={500}
        />
        <div className="absolute inset-0 bg-primary bg-opacity-30 flex items-center justify-center">
          <h1 className="text-3xl font-black text-white tracking-widest drop-shadow-xl">
            {category.name}
          </h1>
        </div>
      </div>
      <div className="flex flex-col items-center py-5">
        <div className="px-10 py-10">{category.description}</div>
        {products.length === 0 || err ? (
          <div className="flex flex-col gap-5">
            <p className="text-center">{t(`notfound2`)}</p>
            <NavLink href="/categories/all">
              <Button>{t(`buttonText`)}</Button>
            </NavLink>
          </div>
        ) : (
          <div className="w-5/6 grid gap-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) =>
              <ProductThumbnail
                key={product.id}
                product={product}
              />
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default Category
