import Button from "@/components/app/ui/Button"
import ProductCarousel from "@/components/app/ui/ProductCarrousel"
import Promotion from "@/components/app/content/Promotions"
import axios from "axios"
import routes from "@/web/routes"

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
    const [allProducts, productData] = await Promise.all([
      axios.get(
          `http://localhost:3000/api${routes.api.admin.products.getProducts()}`
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

    return {
      props: {
        allProducts: allProducts.data.result,
        product: productData.data.result,
      },
    }
  } catch (error) {
    return redirectToInitial()
  }
}
const ProductPage = (props) => {
  const { product, allProducts } = props

  return (
    <>
        <div className="flex justify-center ">
          <div className="w-full lg:w-3/5 ">
            <div className="flex flex-col lg:flex-row lg:justify-between items-center">
              <div className="w-full mt-7 lg:w-1/2 flex justify-center lg:mt-0">
                <ProductCarousel imageState={product.image} />
              </div>
              <div className="w-4/5 lg:w-2/5 flex flex-col gap-8 h-[500px] mt-10  justify-center">
                <div className="flex justify-between font-semibold">
                  <p className="text-xl">{product.price} $</p>
                  <span className="flex flex-col items-end">
                  <h1 className="font-extrabold text-2xl">{product.name}</h1>
                  <p className="text-xs">
                    {product.quantity > 0 ? "En sotck" : "Rupture de Sotck"}{" "}
                  </p>
                </span>
                </div>
                <p>{product.description}</p>
                <Button>Ajouter au panier</Button>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <h2 className="uppercase font-extrabold text-xl">
                Produits similaires
              </h2>
              <div className="overflow-x-auto flex bg-slate-300 w-full space-x-10 px-5 lg:px-0">
                {allProducts.map((product) => (
                    <div key={product.id} className="flex-none w-3/5 lg:w-2/5">
                      <Promotion
                          alt="test"
                          image={product.image}
                          productName={product.name}
                          productPrice={product.price}
                          promotion={product.promotion}
                      />
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
  )
}

export default ProductPage
