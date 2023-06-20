import Button from "@/components/app/ui/Button"
import ProductCarousel from "@/components/app/ui/ProductCarrousel"
import { useCallback, useState } from "react"
import { NavLink } from "@/components/utils/NavLink"
import classNames from "classnames"
import SlideProducts from "@/components/app/content/SlideProducts"
import useAppContext from "@/web/hooks/useAppContext"
import { useTranslation } from "next-i18next"
import getApi from "@/web/getAPI"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import getProductServices from "@/web/services/app/products/getProduct"

export const getServerSideProps = async (context) => {
  const { params, locale } = context

  const api = getApi(context)

  const productId = params.productId
  const withSimilarProducts = true

  const getProduct = getProductServices({ api })
  const [err, data] = await getProduct(productId, withSimilarProducts)

  if (err) {
    return {
      redirect: {
        destination: "/",
      },
    }
  }

  return {
    props: {
      product: data.product,
      similarProducts: data.similarProducts,
      ...(await serverSideTranslations(locale, [
        "product",
        "footer",
        "navbar",
      ])),
    },
  }
}

const ProductPage = (props) => {
  const { product, similarProducts } = props

  const [showPopup, setShowPopup] = useState(false)
  const [showError, setShowError] = useState(false)

  const { t } = useTranslation("product")

  const {
    actions: { addToCart },
    state: { cartItems },
  } = useAppContext()

  const inStock = product.quantity > 0

  const handleAddToCart = useCallback(() => {
    const item = cartItems.find(
      (cartItem) =>
        cartItem.id === product.id &&
        parseInt(product.quantity, 10) === cartItem.product_quantity
    )

    if (item) {
      setShowError(true)

      return
    }

    addToCart(product)
    setShowPopup(true)
  }, [addToCart, cartItems, product])

  return (
    <>
      <div className="flex justify-center">
        <div className="w-full lg:w-3/5 ">
          <div className="flex flex-col lg:flex-row lg:justify-between items-center">
            <div className="w-full mt-7 lg:w-1/2 flex justify-center lg:mt-0 lg:border-2 lg:border-black">
              <ProductCarousel images={product.image} />
            </div>
            <div className="w-4/5 lg:w-2/5 flex flex-col gap-8 h-[500px] mt-10  justify-center">
              <div className="flex flex-col items-center lg:items-end font-semibold gap-5">
                <span className="flex flex-col items-center lg:items-end gap-3">
                  <h1 className="font-extrabold text-md lg:text-2xl">
                    {product.name}
                  </h1>
                  {product.promotion ? (
                    <div className="flex gap-3 text-xl">
                      <p className="line-through">{product.price} €</p>
                      <p className="text-red-600">{product.promotion} €</p>
                    </div>
                  ) : (
                    <div>{product.price} €</div>
                  )}
                  <p className="text-xs">
                    {inStock && t("inStock")}
                  </p>
                </span>
              </div>
              <p>{product.description}</p>
              <Button onClick={inStock && handleAddToCart} disabled={!inStock} variant={inStock ? "primary" : "disabled"}>
                <p>{inStock ? t("addCart") : t("outOfStock")}</p>
              </Button>
            </div>
          </div>
          {similarProducts.length > 0 && (
            <div className="flex flex-col items-center space-y-3">
              <h2 className="uppercase font-extrabold text-xl">
                {t("similarProducts")}
              </h2>
              <div
                className={classNames(
                  "overflow-x-auto scrollbar w-full flex gap-10 p-4",
                  similarProducts.length < 3 && "justify-center"
                )}
              >
                {similarProducts.map((product) => (
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
          )}
        </div>
      </div>
      {showPopup && (
        <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-xl mb-4">{t(`productAddToCart`)}</h2>
            <p>{t(`wantToContinue`)}</p>
            <div className="flex justify-end mt-4">
              <Button
                className="mr-2"
                onClick={() => {
                  setShowPopup(false)
                }}
              >
                {t(`btnContinue`)}
              </Button>
              <Button>
                <NavLink href={`/user/cart`}>{t(`btnToCart`)}</NavLink>
              </Button>
            </div>
          </div>
        </div>
      )}
      {showError && (
        <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-xl font-bold mb-4">{t(`allStock`)}</h2>

            <div className="flex justify-end mt-4">
              <Button
                className="mr-2"
                onClick={() => {
                  setShowError(false)
                }}
              >
                {t(`rollback`)}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductPage
