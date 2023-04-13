import FooterMenu from "@/components/layouts/FooterMenu"
import ProductOrder from "@/components/app/content/ProductOrder"

const Order = () => {
  return (
    <>
      <main>
        <div>
          <div className="flex justify-center mx-6 my-8 lg:my-16">
            <h1 className="font-bold text-2xl hover:cursor-pointer hover:text-[#615043] lg:mr-14 lg:text-4xl">
              Commande #239046 - 2022/10/02 - Livré
            </h1>
          </div>

          <div className="grid lg:grid-cols-2 mb-10 ">
            <div className="flex flex-col w-full md:px-[30%] lg:px-[20%] gap-6 mb-10">
              {example.map((val) => (
                <ProductOrder
                  key={val.id}
                  image={val.image}
                  name={val.name}
                  price={val.price}
                  quantity={val.quantity}
                />
              ))}
            </div>
            <div className="px-[20%] flex flex-col w-full ">
              <div id={"prix"}>
                <div className="flex flex-col">
                  <div className="flex place-content-between">
                    <p className="font-bold text-md lg:text-2xl">TOTAL</p>
                    <p className="font-bold text-md lg:text-2xl "> 4800 € </p>
                  </div>
                  <div className="flex place-content-between">
                    <p className="text-gray-500 text-md lg:text-xl">TVA</p>
                    <p className="text-gray-500 text-md lg:text-xl">800 €</p>
                  </div>
                </div>
              </div>
              <div
                id={"divider"}
                className="border-b-black border-b my-10"
              ></div>
              <div id={"Adresse Livraison"}>
                <div className="flex flex-col">
                  <p className="font-bold text-md lg:text-2xl mb-3">
                    Adresse de livraison
                  </p>
                  <p className="lg:text-xl text-gray-500">John Smith</p>
                  <p className="lg:text-xl text-gray-500">13 rue de la Lune</p>
                  <p className="lg:text-xl text-gray-500">75004 Paris</p>
                  <p className="lg:text-xl text-gray-500">FRANCE</p>
                  <p className="lg:text-xl text-gray-500">+33 6 90 80 70 60</p>
                </div>
              </div>
              <div
                id={"divider"}
                className="border-b-black border-b my-10"
              ></div>
              <div id={"Adresse facturation"}>
                <div className="flex flex-col">
                  <p className="font-bold text-md lg:text-2xl mb-3">
                    Adresse de Facturation
                  </p>
                  <p className="lg:text-xl text-gray-500">John Smith</p>
                  <p className="lg:text-xl text-gray-500">13 rue de la Lune</p>
                  <p className="lg:text-xl text-gray-500">75004 Paris</p>
                  <p className="lg:text-xl text-gray-500">FRANCE</p>
                  <p className="lg:text-xl text-gray-500">+33 6 90 80 70 60</p>
                </div>
              </div>
              <div
                id={"divider"}
                className="border-b-black border-b my-5"
              ></div>
              <div id={"Méthode de payments"}>
                <p className="font-bold text-md lg:text-2xl mb-3">
                  Méthode de paiement
                </p>
                <p className="lg:text-xl text-gray-500">MasterCard</p>
                <p className="lg:text-xl text-gray-500">**** **** **** 6666</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterMenu position="relative" />
    </>
  )
}

export const example = [
  {
    id: 0,
    name: "Chaise en érable",
    price: 1200,
    image: "/images/meuble3.png",
    quantity: 1,
  },
  {
    id: 1,
    name: "Lit en légende",
    price: 1200,
    image: "/images/meuble3.png",
    quantity: 1,
  },
  {
    id: 2,
    name: "Table en rhino",
    price: 1200,
    image: "/images/meuble3.png",
    quantity: 1,
  },
  {
    id: 3,
    name: "Entrecôte Boeuf",
    price: 1200,
    image: "/images/meuble3.png",
    quantity: 1,
  },
]

export default Order
