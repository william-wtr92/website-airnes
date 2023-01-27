import Button from "../utils/Button"
import { TrashIcon } from "@heroicons/react/24/solid"
import { NavLink } from "../utils/NavLink"

const CartView = () => {
  return (
    <div>
      <div className="flex justify-center my-8 lg:my-16">
        <h1 className="font-bold text-2xl hover:cursor-pointer hover:text-[#615043] lg:mr-14 lg:text-4xl">
          Mon Panier
        </h1>
      </div>

      <div className="grid lg:grid-cols-2">
        <div className="flex shadow-xl bg-[#fff] shadow-[#dad0c9] mx-auto w-[300px] justify-start px-4 py-2 lg:w-[550px] lg:mx-36">
          <div className="flex mt-2 lg:items-center lg:mt-0">
            <img
              src="/images/meuble3.png"
              alt="meuble"
              className="w-20 h-20 lg:h-24 lg:w-28 hover:cursor-pointer"
            />
          </div>

          <div className="w-32 lg:w-1/2 lg:ml-10">
            <NavLink href="/">
              <p className="text-sm mt-2 ml-4 font-bold hover:text-[#b3825c] lg:mt-0 lg:ml-0 lg:text-md">
                Table en marbre d'Afganisthan
              </p>
            </NavLink>
            <p className="hidden text-sm mt-2 lg:block">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,
              eaque enim. Tenetur, aut in laudantium mollitia id veniam eaque
              vero.
            </p>
          </div>
          <div className="flex flex-col relative left-5 lg:left-12">
            <p className="font-bold mb-2 lg:mb-2">1200 €</p>
            <input type="number" className="w-10 h-6 border-2 mb-2 lg:mb-4" />
            <div className="w-10 relative left-4">
              <TrashIcon className="h-6 hover:cursor-pointer hover:text-[#927864]" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-10 lg:absolute lg:justify-end lg:top-60 lg:right-40 lg:mt-0">
          <div className="grid grid-cols-2 w-64 lg:w-96">
            <p className="font-bold text-md lg:text-xl">TOTAL</p>
            <p className="font-bold text-md flex justify-end lg:text-xl ">
              4800 €
            </p>
            <p className="ml-2">TVA</p>
            <p className="flex justify-end mr-2">800 €</p>
          </div>
          <div className="my-6">
            <Button
              className="bg-[#615043] hover:bg-[#927864] hover:cursor-pointer
             active:bg-[#615043] border border-black px-10 py-4 font-semibold rounded-md text-[#fff]"
            >
              Passer la Commande
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartView
