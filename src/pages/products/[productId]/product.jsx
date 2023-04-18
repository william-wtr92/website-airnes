import Button from "@/components/app/ui/Button"
import ProductCarousel from "@/components/app/ui/ProductCarrousel"
import axios from "axios"
import routes from "@/web/routes"
import { useCallback, useState } from "react"
import { NavLink } from "@/components/utils/NavLink"
import classNames from "classnames"
import SlideProducts from "@/components/app/content/SlideProducts"
import useAppContext from "@/web/hooks/useAppContext"

export const getServerSideProps = async (context) => {
  const { productId } = context.params

  const redirectToInitial = () => {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  try {
    const [products, productData] = await Promise.all([
      axios.get(
        `http://localhost:3000/api${routes.api.app.getProducts()}?page=1`
      ),

      axios.get(
        `http://localhost:3000/api${routes.api.admin.products.productData(
          productId
        )}`
      ),
    ])

    const isEmpty = productData.data.result.length === 0

    if (isEmpty) {
      return redirectToInitial()
    }

    const similarProducts = products.data.result.filter(
      (product) => product.id === productId
    )

    return {
      props: {
        similarProducts: similarProducts,
        product: productData.data.result,
      },
    }
  } catch (error) {
    return redirectToInitial()
  }
}

const ProductPage = (props) => {
  const { product, similarProducts } = props
  const [showPopup, setShowPopup] = useState(false)
  const [showError, setShowError] = useState(false)

  const {
    actions: { addToCart },
    state: { session, cartItems },
  } = useAppContext()

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
            <div className="w-full mt-7 lg:w-1/2 flex justify-center lg:mt-0">
              <ProductCarousel imageState={product.image} />
            </div>
            <div className="w-4/5 lg:w-2/5 flex flex-col gap-8 h-[500px] mt-10  justify-center">
              <div className="flex justify-between font-semibold">
                <p className="text-xl">{product.price} $</p>
                <span className="flex flex-col items-end">
                  <h1 className="font-extrabold text-md lg:text-2xl">
                    {product.name}
                  </h1>
                  <p className="text-xs">
                    {product.quantity > 0 ? "En stock" : "Rupture de Stock"}{" "}
                  </p>
                </span>
              </div>
              <p>{product.description}</p>
              <Button onClick={handleAddToCart}>Ajouter au panier</Button>
            </div>
          </div>
          {similarProducts.length > 0 && (
            <div className="flex flex-col items-center space-y-3">
              <h2 className="uppercase font-extrabold text-xl">
                Produits similaires
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
                      image={product.image}
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
            <h2 className="text-xl mb-4">Produit ajouté au panier</h2>
            <p>Voulez vous poursuivre vos achats ?</p>
            <div className="flex justify-end mt-4">
              <Button
                className="mr-2"
                onClick={() => {
                  setShowPopup(false)
                }}
              >
                Continuer mes achats
              </Button>
              <Button>
                <NavLink href={`/user/${session.user.id}/cart`}>
                  Se rendre au panier
                </NavLink>
              </Button>
            </div>
          </div>
        </div>
      )}
      {showError && (
        <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-xl font-bold mb-4">
              Vous avez déjà tout le stock de ce produit dans votre panier
            </h2>

            <div className="flex justify-end mt-4">
              <Button
                className="mr-2"
                onClick={() => {
                  setShowError(false)
                }}
              >
                Revenir à la page produit
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductPage
