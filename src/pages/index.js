import Carousel from "@/components/app/ui/Carousel"
import HomepageCategories from "@/components/app/content/HomepageCategories"
import HomepageProducts from "@/components/app/content/HomepageProducts"
import Promotion from "@/components/app/content/Promotions"

const Main = () => {
  const exampleState = [
    {
      id: 0,
      name: "Chaise",
      price: 123,
      promotion: 100,
      image: "/images/meuble2.jpg",
    },
    {
      id: 1,
      name: "Chaise 2",
      price: 456,
      promotion: 400,
      image: "/images/meuble2.jpg",
    },
    {
      id: 2,
      name: "Chaise 3",
      price: 789,
      promotion: 700,
      image: "/images/meuble2.jpg",
    },
    {
      id: 3,
      name: "Chaise 4",
      price: 987,
      promotion: 900,
      image: "/images/meuble2.jpg",
    },
    {
      id: 4,
      name: "Chaise 5",
      price: 654,
      promotion: 600,
      image: "/images/meuble2.jpg",
    },
    {
      id: 5,
      name: "Chaise 5",
      price: 654,
      promotion: 600,
      image: "/images/meuble2.jpg",
    },
    {
      id: 6,
      name: "Chaise 5",
      price: 654,
      promotion: 600,
      image: "/images/meuble2.jpg",
    },
  ]

  return (
    <>
      <main>
        <Carousel />
        <div className="flex flex-col gap-8">
          <div className="text-center text-[13px] font-bold lg:py-6 lg:text-xl">
            <p>
              VENANT DES HAUTES TERRES D’ECOSSE
              <br />
              NOS MEUBLES SONT IMMORTELS
            </p>
          </div>
          <div className="flex flex-wrap justify-center">
            <div className="flex flex-wrap justify-center lg:justify-between">
              <HomepageCategories />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <div className="text-center text-[13px] font-bold lg:py-6 lg:text-xl">
            <p>PRODUITS POPULAIRES</p>
          </div>
          <div className="flex flex-wrap justify-center">
            <div className="flex flex-wrap justify-center lg:justify-between">
              <HomepageProducts />
            </div>
          </div>
        </div>
        <div className="flex justify-center py-10">
          <div className="flex flex-col items-center gap-10 w-[80%]">
            <h3 className="uppercase font-bold text-xl tracking-widest">
              Promotions
            </h3>
            <div className="overflow-x-auto scrollbar flex w-full gap-10 bg-gray-100 p-8">
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
      </main>
    </>
  )
}

export default Main
