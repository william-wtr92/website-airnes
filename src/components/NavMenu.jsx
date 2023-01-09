import { NavLink } from "./NavLink"
import { ShoppingCartIcon, UserIcon, MagnifyingGlassIcon, Bars3Icon } from "@heroicons/react/24/solid"

const NavMenu = () => {
  return (
    <header>
      <div className="flex bg-[#709861] h-10 justify-start">
        <div className="flex mt-2 mr-auto">
          <NavLink href="/"><img src="/images/logo.png" alt="My logo" className="h-6 ml-4"/></NavLink>
        </div>
        <div className="flex mt-2 gap-6">
          <NavLink href="/"><UserIcon className="h-6 hover:scale-110 hover:text-[#97c186]" color={"#fff"} /></NavLink>
          <NavLink href="/"><MagnifyingGlassIcon className="h-6 hover:scale-110 hover:text-[#97c186]" color={"#fff"}/></NavLink>
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