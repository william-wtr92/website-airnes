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
      <div className="flex bg-[#ffffff] h-14 border-b-2 items-center">
        <div className="flex mr-auto ml-10">
          <NavLink href="/">
            {/* <img
              src="/images/logo.png"
              alt="My logo"
              className="h-6 ml-4 hover:scale-110"
            /> */}
            NEW AIRNES LOGO !!
          </NavLink>
        </div>
        <div className="flex gap-6">
          <NavLink href="/user/login">
            <UserIcon
              className={`${
                showSearch && isMobile ? `Hide` : ``
              }h-6 hover:scale-110 hover:text-[#b3825c]`}
              color={"#615043"}
            />
          </NavLink>

          {showSearch ? (
            <div className="search-open">
              <div className="flex items-center">
                <MagnifyingGlassIcon
                  onClick={handleSearch}
                  className={`h-4 hover:scale-110 text-[#443021] relative left-1 top-px cursor-pointer ${
                    isMobile ? `left-[20px]` : ``
                  }`}
                  color={"#615043"}
                />
                <input
                  className={`px-6 rounded-lg border bg-transparent focus:outline-none focus:shadow-outline-blue text-white placeholder-[#443021] -ml-4 focus:border-white ${
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
                className="h-6 hover:scale-110 hover:text-[#b3825c] cursor-pointer"
                color={"#615043"}
              />
            </div>
          )}
          <NavLink href="/">
            <ShoppingCartIcon
              className={`${
                showSearch && isMobile ? `Hide` : ``
              }h-6 hover:scale-110 hover:text-[#b3825c]`}
              color={"#615043"}
            />
          </NavLink>
        </div>
        <div className="ml-10 mr-4">
          <Bars3Icon
            onClick={showBurgerMenu}
            className={`${
              showSearch && isMobile ? `Hide` : ``
            }h-6 hover:scale-110 hover:cursor-pointer hover:text-[#b3825c]`}
            color={"#615043"}
          />
        </div>
        <div
          className={`${
            burgerMenu ? `block ` : `hidden `
          }w-1/6 h-screen bg-[#646E4E] absolute inset-y-0 right-0 -z-50`}
        >
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
