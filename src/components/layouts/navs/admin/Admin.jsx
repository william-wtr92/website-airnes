import { useRouter } from "next/router"
import {
  Bars4Icon,
  ChartBarSquareIcon,
  ClipboardDocumentCheckIcon,
  EnvelopeIcon,
  FolderIcon,
  HomeIcon,
  Cog8ToothIcon,
  ClipboardIcon
} from "@heroicons/react/24/outline"
import { UsersIcon } from "@heroicons/react/24/solid"
import { useState } from "react"
import { NavLink } from "@/components/utils/NavLink"
import { Section } from "@/components/layouts/navs/admin/Section"
import useAppContext from "@/web/hooks/useAppContext"
import classNames from "classnames"

const Admin = () => {
  const router = useRouter()

  const {
    state: { session }
  } = useAppContext()

  const [burgerMenu, setBurgerMenu] = useState(false)

  const sections = [
    { name: "dashboard", icon: ChartBarSquareIcon },
    { name: "homepage", icon: HomeIcon },
    { name: "contacts", icon: EnvelopeIcon },
    { name: "categories", icon: FolderIcon },
    { name: "materials", icon: ClipboardIcon },
    { name: "products", icon: ClipboardDocumentCheckIcon },
    { name: "users", icon: UsersIcon }
  ]

  const handleBodyScroll = (disable) => {
    document.body.style.overflow = disable ? "hidden" : "auto"
  }

  const handleBurgerMenu = () => {
    setBurgerMenu(!burgerMenu)
    handleBodyScroll(!burgerMenu)
  }

  return (
    <>
      <div className="h-full bg-gray-100 lg:hidden">
        <button onClick={handleBurgerMenu} className="right-0 p-4">
          <Bars4Icon className="h-6 w-6"/>
        </button>
      </div>
      <div
        className={classNames(
          burgerMenu ? "block" : "lg:block hidden",
          "h-screen space-y-10 sidebar bg-gray-100 font-semibold w-full lg:w-64 px-2 py-4 sticky top-0 left-0 z-50"
        )}
      >
        <div className="p-4 flex flex-row justify-between items-center">
          <NavLink href={"/"}>
            <h1 className="font-bold hover:scale-105">AIRNEIS</h1>
          </NavLink>
        </div>
        <nav className="px-2 flex flex-col gap-4 uppercase">
          {sections.map((section) => (
            <Section
              key={section.name}
              section={section}
              router={router}
              handleBurgerMenu={handleBurgerMenu}
            />
          ))}
        </nav>

        {session && session.user && (
          <div className="fixed lg:absolute bottom-0 left-0 w-full">
            <div className="flex flex-row gap-6 p-4 border-t-2 border-gray-200">
              <NavLink href={`/user/${session.user.id}/settings`}>
                <Cog8ToothIcon className="h-6 hover:scale-105"/>
              </NavLink>
              <span className="uppercase">{session.user.name} - Admin</span>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Admin
