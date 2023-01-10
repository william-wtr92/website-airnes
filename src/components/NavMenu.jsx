import { NavLink } from "./NavLink"
import { ShoppingCartIcon, UserIcon, MagnifyingGlassIcon, Bars3Icon } from "@heroicons/react/24/solid"
import { useState } from "react"

const NavMenu = () => {
  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = () => {
    !showSearch ? setShowSearch(true) : setShowSearch(false)
  }

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <header>
      <div className="flex bg-[#709861] h-10 justify-start">
        <div className="flex mt-2 mr-auto">
          <NavLink href="/"><img src="/images/logo.png" alt="My logo" className="h-6 ml-4"/></NavLink>
        </div>
        <div className="flex mt-2 gap-6">
          <NavLink href="/user/login"><UserIcon className="h-6 hover:scale-110 hover:text-[#97c186]" color={"#fff"} /></NavLink>

          {showSearch ? (
            <div className="flex items-center mb-3 -ml-6">
              <MagnifyingGlassIcon onClick={handleSearch} className="h-4 hover:scale-110 text-[#97c186] relative left-6 top-[2px] cursor-pointer" color={"#fff"} />
              <input 
                className="px-6 py-px rounded-lg border bg-transparent focus:outline-none focus:shadow-outline-blue text-white placeholder-[#709861] ml-px mt-1 focus:border-white " 
                type="search" 
                placeholder="Rechercher" 
                value={searchTerm} 
                onChange={handleChange}
              />
            </div>
          ) : (
            <div>
              <MagnifyingGlassIcon onClick={handleSearch} className="h-6 hover:scale-110 hover:text-[#97c186] cursor-pointer" color={"#fff"} />
            </div>
          )}

          <NavLink href="/"><ShoppingCartIcon className="h-6 hover:scale-110 hover:text-[#97c186]" color={"#fff"} /></NavLink>
        </div>
        <div className="mt-2 ml-10 mr-4">
          <NavLink href="/"><Bars3Icon className="h-6 hover:scale-110 hover:text-[#97c186]" color={"#fff"}/></NavLink>
        </div>
      </div>
    </header>
  )
}

export default NavMenu;
