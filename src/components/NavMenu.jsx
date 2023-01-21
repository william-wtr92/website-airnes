import { NavLink } from "./NavLink"
import {
  ShoppingCartIcon,
  UserIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid"
import { useState } from "react"
import { useMediaQuery } from "react-responsive"

const NavMenu = () => {
  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" })
  const [burgerMenu, setBurgerMenu] = useState(false)

  const handleSearch = () => {
    !showSearch ? setShowSearch(true) : setShowSearch(false)
  }

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const showBurgerMenu = () => {
    !burgerMenu ? setBurgerMenu(true) : setBurgerMenu(false)
  }

  return (
    <header>
      <div className="flex bg-[#709861] h-10 justify-start">
        <div className="flex mt-2 mr-auto">
          <NavLink href="/">
            <img
              src="/images/logo.png"
              alt="My logo"
              className="h-6 ml-4 hover:scale-110"
            />
          </NavLink>
        </div>
        <div className="flex mt-2 gap-6">
          <NavLink href="/user/login">
            <UserIcon
              className={`${
                showSearch && isMobile ? `Hide` : ``
              }h-6 hover:scale-110 hover:text-[#97c186]`}
              color={"#fff"}
            />
          </NavLink>

          {showSearch ? (
            <div className="search-open">
              <div className="flex items-center mb-3">
                <MagnifyingGlassIcon
                  onClick={handleSearch}
                  className={`h-4 hover:scale-110 text-[#97c186] relative left-1 top-px cursor-pointer ${
                    isMobile ? `left-[20px]` : ``
                  }`}
                  color={"#fff"}
                />
                <input
                  className={`px-6 rounded-lg border bg-transparent focus:outline-none focus:shadow-outline-blue text-white placeholder-[#709861] -ml-4 focus:border-white ${
                    isMobile ? `-ml-10 relative left-16` : ``
                  }`}
                  type="search"
                  placeholder="Rechercher"
                  value={searchTerm}
                  onChange={handleChange}
                />
              </div>
            </div>
          ) : (
            <div>
              <MagnifyingGlassIcon
                onClick={handleSearch}
                className="h-6 hover:scale-110 hover:text-[#97c186] cursor-pointer"
                color={"#fff"}
              />
            </div>
          )}
          <NavLink href="/">
            <ShoppingCartIcon
              className={`${
                showSearch && isMobile ? `Hide` : ``
              }h-6 hover:scale-110 hover:text-[#97c186]`}
              color={"#fff"}
            />
          </NavLink>
        </div>
        <div className="mt-2 ml-10 mr-4">
            <Bars3Icon
              onClick={showBurgerMenu}
              className={`${
                showSearch && isMobile ? `Hide` : ``
              }h-6 hover:scale-110 hover:text-[#97c186]`}
              color={"#fff"}
            />
        </div>
        <div className={`${burgerMenu ? `block ` : `hidden `}w-1/6 h-screen bg-[#646E4E] absolute inset-y-0 right-0 -z-50`}>
          <NavLink href="/user/login">
            <div className="hover:text-[#97c186] p-10 h-10 hover:scale-110">
              Login
            </div>
          </NavLink>
          <NavLink href="/">
            <div className="hover:text-[#97c186] p-10 h-10 hover:scale-110">
              Home
            </div>
          </NavLink>
        </div>
      </div>
    </header>
  )
}

export default NavMenu
