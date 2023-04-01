import { Section } from "@/components/layouts/navs/admin/Section"
import {
  Bars4Icon,
  ChartBarSquareIcon,
  ClipboardDocumentCheckIcon,
  EnvelopeIcon,
  FolderIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { UsersIcon } from "@heroicons/react/24/solid"
import { useState } from "react"

const Admin = () => {
  const [burgerMenu, setBurgerMenu] = useState(false)

  const handleBurgerMenu = () => {
    setBurgerMenu(!burgerMenu)
  }

  return (
    <>
      <div className="h-full bg-gray-100 lg:hidden">
        <button onClick={handleBurgerMenu} className="right-0 p-4">
          <Bars4Icon className="h-6 w-6" />
        </button>
      </div>
      <div
        className={`${
          burgerMenu ? `block top-0 ` : `lg:block hidden `
        }h-screen space-y-10 sidebar bg-gray-100 font-semibold w-full lg:w-64 px-2 py-4 absolute lg:relative left-0 z-50`}
      >
        <div className="p-4 flex flex-row justify-between items-center">
          <h1 className="font-bold">AIRNEIS</h1>
          <XMarkIcon className="h-6 w-6 lg:hidden" onClick={handleBurgerMenu} />
        </div>
        <nav className="px-4 flex flex-col gap-8 uppercase">
          <div className="flex flex-row gap-4">
            <ChartBarSquareIcon className="h-6 w-6" />
            <Section name="dashboard" />
          </div>
          <div className="flex flex-row gap-4">
            <HomeIcon className="h-6 w-6" />
            <Section name="homepage" />
          </div>
          <div className="flex flex-row gap-4">
            <EnvelopeIcon className="h-6 w-6" />
            <Section name="contacts" />
          </div>
          <div className="flex flex-row gap-4">
            <FolderIcon className="h-6 w-6" />
            <Section name="categories" />
          </div>
          <div className="flex flex-row gap-4">
            <ClipboardDocumentCheckIcon className="h-6 w-6" />
            <Section name="products" />
          </div>
          <div className="flex flex-row gap-4">
            <UsersIcon className="h-6 w-6" />
            <Section name="users" />
          </div>
        </nav>
      </div>
    </>
  )
}

export default Admin
