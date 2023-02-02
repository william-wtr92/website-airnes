import {
  UserGroupIcon,
  HomeIcon,
  PresentationChartBarIcon,
  ShoppingBagIcon,
  FolderOpenIcon,
} from "@heroicons/react/24/solid"
import { NavLink } from "../utils/NavLink"
import Image from "next/image"

const NavMenuAdmin = () => {
  return (
    <header className="w-1/6 bg-gray-200 h-screen">
      <div className="flex justify-center">
        <Image
          src="/images/logo_admin.png"
          alt="Admin Logo"
          width={100}
          height={1}
          className="h-24 w-24 hover:scale-110"
        />
      </div>
      <div className="flex flex-col gap-4 mx-14 mt-10 absolute top-[10%]">
        <div className="flex gap-2 py-2 px-2 hover:bg-gray-300">
          <HomeIcon className="h-6" />
          <NavLink href="/admin/home">Home</NavLink>
        </div>
        <div className="flex gap-2 py-2 px-2 hover:bg-gray-300">
          <UserGroupIcon className="h-6" />
          <NavLink href="/admin/users">Utilisateurs</NavLink>
        </div>
        <div className="flex gap-2 py-2 px-2 hover:bg-gray-300">
          <FolderOpenIcon className="h-6" />
          <NavLink href="/admin/categories">Categories</NavLink>
        </div>
        <div className="flex gap-2 py-2 px-2 hover:bg-gray-300">
          <ShoppingBagIcon className="h-6" />
          <NavLink href="/admin/products">Produits</NavLink>
        </div>
        <div className="flex gap-2 py-2 px-2 hover:bg-gray-300">
          <PresentationChartBarIcon className="h-6" />
          <NavLink href="/admin/statistics">Statistics</NavLink>
        </div>
      </div>
    </header>
  )
}

export default NavMenuAdmin