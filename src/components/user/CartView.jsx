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

      <div className="flex shadow-xl shadow-[#dad0c9] w-[550px] mx-20 my-8 p-4">
        <div className="flex items-center">
          <img src="/images/meuble3.png" alt="meuble" className="h-24 w-30" />
        </div>

        <div className="w-1/2 ml-10">
          <NavLink href="/">
            <p className="font-bold">Table en marbre d'Afganisthan</p>
          </NavLink>
          <p className="text-sm mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,
            eaque enim. Tenetur, aut in laudantium mollitia id veniam eaque
            vero.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="grid ml-10 grid-cols-1 grid-rows-3 gap-2">
            <p className="font-bold relative left-6">1200 €</p>
            <input
              type="number"
              className="w-10 h-6 border-2 relative left-8"
            />
            <div className="w-10 relative left-12">
              <TrashIcon className="h-6 hover:cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex shadow-xl shadow-[#dad0c9] w-[550px] mx-20 my-8 p-4">
        <div className="flex items-center">
          <img src="/images/meuble3.png" alt="meuble" className="h-24 w-30" />
        </div>

        <div className="w-1/2 ml-10">
          <NavLink href="/">
            <p className="font-bold">Table en marbre d'Afganisthan</p>
          </NavLink>
          <p className="text-sm mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,
            eaque enim. Tenetur, aut in laudantium mollitia id veniam eaque
            vero.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="grid ml-10 grid-cols-1 grid-rows-3 gap-2">
            <p className="font-bold relative left-6">1200 €</p>
            <input
              type="number"
              className="w-10 h-6 border-2 relative left-8"
            />
            <div className="w-10 relative left-12">
              <TrashIcon className="h-6 hover:cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex shadow-xl shadow-[#dad0c9] w-[550px] mx-20 my-8 p-4">
        <div className="flex items-center">
          <img src="/images/meuble3.png" alt="meuble" className="h-24 w-30" />
        </div>

        <div className="w-1/2 ml-10">
          <NavLink href="/">
            <p className="font-bold">Table en marbre d'Afganisthan</p>
          </NavLink>
          <p className="text-sm mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,
            eaque enim. Tenetur, aut in laudantium mollitia id veniam eaque
            vero.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="grid ml-10 grid-cols-1 grid-rows-3 gap-2">
            <p className="font-bold relative left-6">1200 €</p>
            <input
              type="number"
              className="w-10 h-6 border-2 relative left-8"
            />
            <div className="w-10 relative left-12">
              <TrashIcon className="h-6 hover:cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex shadow-xl shadow-[#dad0c9] w-[550px] mx-20 my-8 p-4">
        <div className="flex items-center">
          <img src="/images/meuble3.png" alt="meuble" className="h-24 w-30" />
        </div>

        <div className="w-1/2 ml-10">
          <NavLink href="/">
            <p className="font-bold">Table en marbre d'Afganisthan</p>
          </NavLink>
          <p className="text-sm mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,
            eaque enim. Tenetur, aut in laudantium mollitia id veniam eaque
            vero.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="grid ml-10 grid-cols-1 grid-rows-3 gap-2">
            <p className="font-bold relative left-6">1200 €</p>
            <input
              type="number"
              className="w-10 h-6 border-2 relative left-8"
              value={1}
            />
            <div className="w-10 relative left-12">
              <TrashIcon className="h-6 hover:cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-60 right-40">
        <div className="grid grid-cols-2 w-96">
          <p className="font-bold text-xl">TOTAL</p>
          <p className="font-bold text-xl flex justify-end">4800 €</p>
          <p className="ml-2">TVA</p>
          <p className="flex justify-end mr-2">800 €</p>
        </div>
        <div className="my-6">
          <Button>Passer la Commande</Button>
        </div>
      </div>
    </div>
  )
}

export default CartView
