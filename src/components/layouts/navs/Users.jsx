import { NavLink } from "@/components/utils/NavLink"
import Image from "next/image"
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid"
import { useState, useEffect } from "react"
import { Collapse } from "@/components/app/ui/Collapse"
import config from "@/web/config"
import parseSession from "@/web/parseSession"

const Users = () => {
  const [burgerMenu, setBurgerMenu] = useState(false)
  const [token, setToken] = useState(false)

  useEffect(() => {
    const jwt = localStorage.getItem(config.session.localStorageKey)

    if (jwt) {
      setToken(parseSession(jwt))
    }
  }, [])

  const categoryOptions = [
    {
      name: "Toutes les categories",
      redirection: "/categories/all",
    },
    {
      name: "Salon",
      redirection: "/categories/1/categories",
    },
    {
      name: "Chambre",
      redirection: "/categories/2/categories",
    },
    {
      name: "Salle à manger",
      redirection: "/categories/3/categories",
    },
  ]
  const productOptions = [
    {
      name: "Tous les produits",
      redirection: "/products/all",
    },
    {
      name: "Tables",
      redirection: "",
    },
    {
      name: "Lits",
      redirection: "",
    },
    {
      name: "Bureaux",
      redirection: "",
    },
  ]

  const toggleBurgerMenu = () => {
    setBurgerMenu(!burgerMenu)
  }

  let cartNumber = 0
  cartNumber = cartNumber === 0 ? null : cartNumber > 9 ? "9+" : cartNumber

  return (
    <>
      <header className="bg-white sticky top-0 z-20">
        <div className="flex h-14 items-center shadow-sm shadow-[#615043]">
          <div className="flex mr-auto ml-2 mt-2 lg:ml-10">
            <NavLink href="/">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={100}
                height={1}
                className="h-24 w-24 hover:scale-110 lg:w-24"
              />
            </NavLink>
          </div>
          <div className="flex gap-2 lg:gap-6">
            <NavLink
              href={token ? `/user/${token.user.id}/home` : `/user/login`}
            >
              <UserIcon
                className={`h-6 hover:scale-110 hover:text-[#b3825c]`}
                color={"#615043"}
              />
            </NavLink>
            <NavLink href="/categories/search">
              <MagnifyingGlassIcon
                className={`h-6 hover:scale-110 hover:text-[#b3825c]`}
                color={"#615043"}
              />
            </NavLink>
            <NavLink href="/user/userId/cart">
              <ShoppingCartIcon
                className={`h-6 hover:scale-110 hover:text-[#b3825c]`}
                color={"#615043"}
              />

              {cartNumber !== null && (
                <div
                  className={`absolute top-7 px-2 ${
                    cartNumber < 9
                      ? "right-12 lg:right-16"
                      : "right-[43px] lg:right-[58px]"
                  } -z-10 bg-[#EDE4E0] text-primary font-bold text-xs rounded-full lg:px-2`}
                >
                  {cartNumber}
                </div>
              )}
            </NavLink>
          </div>
          <div className="ml-6 mr-4 lg:ml-10">
            <Bars3Icon
              onClick={toggleBurgerMenu}
              className={`h-6 hover:scale-110 hover:cursor-pointer hover:text-[#b3825c]`}
              color={"#615043"}
            />
          </div>
          <div
            className={`${
              burgerMenu ? `block ` : `hidden `
            }w-full md:w-[325px] h-screen bg-[#ffffff] absolute inset-y-0 right-0 z-50 opacity-95`}
          >
            <div>
              <XMarkIcon
                className="h-6 hover:cursor-pointer relative top-4 left-3 hover:scale-105"
                onClick={toggleBurgerMenu}
              />
            </div>
            <div className="flex flex-col mx-16 my-10 gap-10">
              <div className="hover:text-[#615043] hover:scale-105">
                <NavLink href="/user/login">Connexion</NavLink>
              </div>
              <div className="hover:text-[#615043] hover:scale-105">
                <Collapse title="Catégories" content={categoryOptions} />
              </div>
              <div className="hover:text-[#615043] hover:scale-105">
                <Collapse title="Produits" content={productOptions} />
              </div>
              <div className="hover:text-[#615043] hover:scale-105">
                <NavLink href="/">Promotions</NavLink>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Users
