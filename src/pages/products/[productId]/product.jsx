import Button from "@/components/app/ui/Button"
import ProductCarousel from "@/components/app/ui/ProductCarrousel"
import Promotion from "@/components/app/content/Promotions"

const imageState = [
  { id: 0, src: "/images/meuble2.jpg", alt: "totu", sens: "h" },
  { id: 1, src: "/images/meuble4.jpg", alt: "totu", sens: "h" },
  { id: 2, src: "/images/meuble5.jpg", alt: "totu", sens: "h" },
  { id: 3, src: "/images/meuble3.png", alt: "totu", sens: "v" },
]

const exampleState = [
  {
    id: 0,
    name: "Chaise",
    price: 123,
    image: "/images/meuble2.jpg",
  },
  {
    id: 1,
    name: "Chaise 2",
    price: 456,
    image: "/images/meuble2.jpg",
  },
  {
    id: 2,
    name: "Chaise 3",
    price: 789,
    image: "/images/meuble2.jpg",
  },
  {
    id: 3,
    name: "Chaise 4",
    price: 987,
    image: "/images/meuble2.jpg",
  },
  {
    id: 4,
    name: "Chaise 5",
    price: 654,
    image: "/images/meuble2.jpg",
  },
  {
    id: 5,
    name: "Chaise 5",
    price: 654,
    image: "/images/meuble2.jpg",
  },
  {
    id: 6,
    name: "Chaise 5",
    price: 654,
    image: "/images/meuble2.jpg",
  },
]

const ProductPage = () => {
  return (
    <>
      <div className="flex justify-center ">
        <div className="w-full lg:w-3/5 ">
          <div className="flex flex-col lg:flex-row lg:justify-between items-center">
            <div className="w-full lg:w-1/2 flex justify-center">
              <ProductCarousel imageState={imageState} />
            </div>
            <div className="w-4/5 lg:w-2/5 flex flex-col gap-8 h-[500px] mt-10  justify-center">
              <div className="flex justify-between font-semibold">
                <p>1 200€</p>
                <span className="flex flex-col items-end">
                  <h1>Chaise de Bureau</h1>
                  <p>xx stock</p>
                </span>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatem rerum debitis quasi eius ut odio quod, cumque harum
                iure animi voluptate, commodi voluptas deleniti beatae minus
                illo assumenda veniam dolore. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Doloremque, quo, recusandae magnam
                aliquam dicta eos quas optio non iste voluptatibus nesciunt odio
                ab molestiae harum? Ipsam ab neque iure expedita.
              </p>
              <Button>Ajouter au panier</Button>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <h3 className="uppercase font-extrabold text-xl">
              Produits similaires
            </h3>
            <div className="overflow-x-auto flex bg-slate-300 w-full space-x-10 px-5 lg:px-0">
              {exampleState.map((product) => (
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
