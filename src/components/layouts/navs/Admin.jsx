import {
  UserGroupIcon,
  HomeIcon,
  ShoppingBagIcon,
  FolderOpenIcon,
  AdjustmentsHorizontalIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid"
import { NavLink } from "../../utils/NavLink"
import Image from "next/image"
import { useState, useEffect } from "react"

const Admin = () => {
  const [showBurger, setShowBurger] = useState(false)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const handleShowBurger = () => {
    !showBurger ? setShowBurger(true) : setShowBurger(false)
  }

  return (
    <header className="z-10 sticky top-0 w-full bg-gray-200 h-14 lg:border-r-2 lg:shadow-2xl lg:h-screen lg:flex lg:justify-center lg:w-1/6">
      <div className="flex lg:justify-center">
        <div className="flex items-center ml-4 lg:items-start lg:ml-0">
          <Image
            src="/images/logo_admin.png"
            alt="Admin Logo"
            width={100}
            height={1}
            className="h-[60px] w-14 lg:h-24 lg:w-24 lg:hover:scale-110"
          />
        </div>
        <div className="flex items-center absolute right-4 top-4">
          <Bars3Icon
            className="block h-6 lg:hidden hover:cursor-pointer"
            onClick={handleShowBurger}
          />
        </div>
      </div>
      <div className="text-gray-600 lg:flex lg:flex-col lg:gap-6 lg:mx-10 lg:mt-10 lg:absolute lg:top-[10%]">
        {showBurger && isMobile && (
          <>
            <div className="h-[90vh] flex flex-col items-center py-20 gap-8 bg-[#ffffffd7]">
              <div className="flex w-28 gap-2">
                <HomeIcon className="h-6" />
                <NavLink href="/admin/home">Home</NavLink>
              </div>
              <div className="flex w-28 gap-2">
                <UserGroupIcon className="h-6" />
                <NavLink href="/admin/users">Utilisateurs</NavLink>
              </div>
              <div className="flex w-28 gap-2">
                <FolderOpenIcon className="h-6" />
                <NavLink href="/admin/categories">Categories</NavLink>
              </div>
              <div className="flex w-28 gap-2">
                <ShoppingBagIcon className="h-6" />
                <NavLink href="/admin/products">Produits</NavLink>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex justify-center pt-3 fixed bottom-2 border-t-2 border-gray-300 w-full">
                <p className="text-sm font-bold text-gray-600 hover:cursor-pointer">
                  Fabrice Admin
                </p>
                <NavLink href="/">
                  <AdjustmentsHorizontalIcon className="h-6 ml-4 text-gray-600" />
                </NavLink>
              </div>
            </div>
          </>
        )}
        {!isMobile && (
          <div className="flex flex-col gap-4">
            <div className="flex py-2 px-4 gap-2 rounded-lg hover:bg-gray-300">
              <HomeIcon className="h-6" />
              <NavLink href="/admin/home">Home</NavLink>
            </div>
            <div className="flex py-2 px-4 gap-2 rounded-lg hover:bg-gray-300">
              <UserGroupIcon className="h-6" />
              <NavLink href="/admin/users">Utilisateurs</NavLink>
            </div>
            <div className="flex py-2 px-4 gap-2 rounded-lg hover:bg-gray-300">
              <FolderOpenIcon className="h-6" />
              <NavLink href="/admin/categories">Categories</NavLink>
            </div>
            <div className="flex py-2 px-4 gap-2 rounded-lg hover:bg-gray-300">
              <ShoppingBagIcon className="h-6" />
              <NavLink href="/admin/products">Produits</NavLink>
            </div>
          </div>
        )}
      </div>
      <div className="hidden justify-center w-full absolute bottom-0 border-t-2 border-gray-300 py-4 hover:bg-gray-300 lg:flex">
        <p className="text-sm font-bold text-gray-600 hover:cursor-pointer">
          Fabrice Admin
        </p>
        <NavLink href="/">
          <AdjustmentsHorizontalIcon className="h-6 ml-10 text-gray-600" />
        </NavLink>
      </div>
    </header>
  )
}

export default Admin
