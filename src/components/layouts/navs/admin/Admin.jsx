import { Section } from "@/components/layouts/navs/admin/Section"
import {
  Bars4Icon,
  ChartBarSquareIcon,
  ClipboardDocumentCheckIcon,
  EnvelopeIcon,
  FolderIcon,
  HomeIcon,
  Cog8ToothIcon,
} from "@heroicons/react/24/outline"
import { UsersIcon } from "@heroicons/react/24/solid"
import { useEffect, useState } from "react"
import axios from "axios"
import routes from "@/web/routes"
import { NavLink } from "@/components/utils/NavLink"

const formatName = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

const Admin = ({ session }) => {
  const [burgerMenu, setBurgerMenu] = useState(false)

  const [userName, setUserName] = useState("")

  useEffect(() => {
    if (session && session.user) {
      const fetchUserData = async () => {
        const data = await axios.get(
          `http://localhost:3000/api${routes.api.user.userData(
            session.user.id
          )}`
        )
        setUserName(formatName(data.data.result.name))
      }

      fetchUserData()
    }
  }, [session])

  const handleBodyScroll = (disable) => {
    if (disable) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }

  const handleBurgerMenu = () => {
    setBurgerMenu(!burgerMenu)
    handleBodyScroll(!burgerMenu)
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
          burgerMenu ? `block ` : `lg:block hidden `
        }h-screen space-y-10 sidebar bg-gray-100 font-semibold w-full lg:w-64 px-2 py-4 sticky top-0 left-0 z-50`}
      >
        <div className="p-4 flex flex-row justify-between items-center">
          <NavLink href={`/admin/homepage`}>
            <h1 className="font-bold hover:scale-105">AIRNEIS</h1>
          </NavLink>
        </div>
        <nav className="px-4 flex flex-col gap-8 uppercase">
          <div className="flex flex-row gap-4 hover:scale-105">
            <ChartBarSquareIcon className="h-6 w-6" />
            <Section name="dashboard" />
          </div>
          <div className="flex flex-row gap-4 hover:scale-105">
            <HomeIcon className="h-6 w-6" />
            <Section name="homepage" />
          </div>
          <div className="flex flex-row gap-4 hover:scale-105">
            <EnvelopeIcon className="h-6 w-6" />
            <Section name="contacts" />
          </div>
          <div className="flex flex-row gap-4 hover:scale-105">
            <FolderIcon className="h-6 w-6" />
            <Section name="categories" />
          </div>
          <div className="flex flex-row gap-4 hover:scale-105">
            <ClipboardDocumentCheckIcon className="h-6 w-6" />
            <Section name="products" />
          </div>
          <div className="flex flex-row gap-4 hover:scale-105">
            <UsersIcon className="h-6 w-6" />
            <Section name="users" />
          </div>
        </nav>
        {session && session.user && (
          <>
            <div className="fixed lg:absolute bottom-0 left-0 w-full">
              <div className="flex flex-row gap-6 p-4 border-t-2 border-gray-200">
                <NavLink href={`/user/${session.user.id}/settings`}>
                  <Cog8ToothIcon className="h-6 hover:scale-105" />
                </NavLink>
                <span>{userName} - Admin</span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Admin
