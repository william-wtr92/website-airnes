import {NavLink} from "@/components/utils/NavLink"
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserIcon,
  XMarkIcon,
  ChevronRightIcon,
  GlobeAltIcon
} from "@heroicons/react/24/solid"
import {useState, useEffect, useCallback} from "react"
import {useRouter} from "next/router"
import Button from "@/components/app/ui/Button"
import useAppContext from "@/web/hooks/useAppContext"
import {useTranslation} from "next-i18next"

const Users = (props) => {
  const { className } = props

  const {
    actions: { logout, changeLanguage },
    state: { session, cartItems }
  } = useAppContext()

  const router = useRouter()

  const [burgerMenu, setBurgerMenu] = useState(false)

  useEffect(() => {
    setBurgerMenu(false)
  }, [router.pathname])

  const toggleBurgerMenu = () => {
    setBurgerMenu(!burgerMenu)
  }

  const [cartNumber, setCartNumber] = useState(0)

  useEffect(() => {
    setCartNumber(cartItems.length)
  }, [cartItems])

  let number = cartNumber === 0 ? null : cartNumber > 9 ? "9+" : cartNumber

  const handleLogout = useCallback(async () => {
    logout()
    await router.push("/")
    setBurgerMenu(false)
  }, [router, logout])

  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)

  const toggleLanguageMenu = () => {
    setLanguageMenuOpen(!languageMenuOpen)
  }

  const handleLanguageChange = useCallback(
    (lang) => {
      changeLanguage(lang)
      setLanguageMenuOpen(false)
    },
    [changeLanguage]
  )

  const { t } = useTranslation("navbar")

  return (
    <>
      <header className="bg-white sticky top-0 z-20">
        <div className="flex h-14 items-center shadow-sm shadow-[#615043]">
          <div className="flex mr-auto ml-2 mt-2 lg:ml-10">
            <NavLink href="/">
              <span
                className={`${className} font-black text-3xl text-primary cursor-pointer hover:scale-110 lg:text-4xl lg:w-24`}
              >
                Airneis
              </span>
            </NavLink>
          </div>
          <div className="flex gap-2 lg:gap-6">
            <NavLink
              href={session ? `/user/${session.user.id}/home` : "/user/login"}
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
            <NavLink href={`/user/cart`}>
              <ShoppingCartIcon
                className={`h-6 hover:scale-110 hover:text-[#b3825c]`}
                color={"#615043"}
              />

              {cartNumber !== 0 && (
                <div
                  className={`absolute top-7 px-2 ${
                    cartNumber < 9
                      ? "right-12 lg:right-16"
                      : "right-[43px] lg:right-[58px]"
                  } -z-10 bg-[#EDE4E0] text-primary font-bold text-xs rounded-full lg:px-2`}
                >
                  {number}
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
            }w-full md:w-[325px] min-h-screen bg-[#ffffff] absolute inset-y-0 right-0 z-50 opacity-95 lg:border-l-2 lg:border-primary`}
          >
            <div>
              <XMarkIcon
                className="h-6 hover:cursor-pointer relative top-4 left-3 hover:scale-105"
                onClick={toggleBurgerMenu}
              />
            </div>
            <div className="flex flex-col mx-12 my-10 gap-4">
              {session ? (
                <div className="flex flex-col gap-4">
                  <NavLink href={`/user/${session.user.id}/orders`}>
                    <div className="flex gap-4 hover:text-[#6f5e3f]">
                      <ChevronRightIcon className="h-6 w-6"/>
                      <p className="hover:scale-105">{t("mycommands")}</p>
                    </div>
                  </NavLink>
                  <div className="flex gap-4 hover:text-[#6f5e3f]">
                    <ChevronRightIcon className="h-6 w-6"/>
                    <p className="hover:scale-105" onClick={handleLogout}>{t("logout")}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                    <NavLink href="/user/login">
                      <div className="flex gap-4 hover:text-[#6f5e3f]">
                        <ChevronRightIcon className="h-6 w-6"/>
                        <p className="hover:scale-105">{t("signin")}</p>
                      </div>
                    </NavLink>
                    <NavLink href="/signup">
                      <div className="flex gap-4 hover:text-[#6f5e3f]">
                        <ChevronRightIcon className="h-6 w-6"/>
                        <p className="hover:scale-105">{t("signup")}</p>
                      </div>
                    </NavLink>
                </div>
              )}
            </div>
            <div
              className={"flex flex-col mx-12 my-20 gap-4"}
            >
              <div>
                <NavLink href="/categories/all">
                  <div className="flex gap-4 hover:text-[#6f5e3f]">
                    <ChevronRightIcon className="h-6 w-6"/>
                    <p className="hover:scale-105">{t("categories")}</p>
                  </div>
                </NavLink>
              </div>

              <div>
                <div className="flex gap-4">
                  <ChevronRightIcon className="h-6 w-6"/>
                  <p className="hover:scale-105">{t("promotions")}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col mx-12 my-20 gap-4">
              <div>
                <NavLink href="/help/cgu">
                  <div className="flex gap-4 hover:text-[#6f5e3f]">
                    <ChevronRightIcon className="h-6 w-6"/>
                    <p className="hover:scale-105">{t("cgu")}</p>
                  </div>
                </NavLink>
              </div>
              <div>
                <NavLink href="/help/legal">
                  <div className="flex gap-4 hover:text-[#6f5e3f]">
                    <ChevronRightIcon className="h-6 w-6"/>
                    <p className="hover:scale-105">{t("legal")}</p>
                  </div>
                </NavLink>
              </div>
              <div>
                <NavLink href="/support/contact">
                  <div className="flex gap-4 hover:text-[#6f5e3f]">
                    <ChevronRightIcon className="h-6 w-6"/>
                    <p className="hover:scale-105">{t("contact")}</p>
                  </div>
                </NavLink>
              </div>
              <div>
                <NavLink href="/">
                  <div className="flex gap-4 hover:text-[#6f5e3f]">
                    <ChevronRightIcon className="h-6 w-6"/>
                    <p className="hover:scale-105">{t("about")}</p>
                  </div>
                </NavLink>
              </div>

              <div className="flex my-10 lg:my-20 gap-4">
                <Button
                  className="w-60 flex gap-4 whitespace-nowrap hover:text-[#e8e1d4]"
                  onClick={toggleLanguageMenu}
                >
                  <GlobeAltIcon className="h-6"/>
                  <p className="text-sm">{t("languageChange")}</p>
                </Button>
                <div
                  className={`${
                    languageMenuOpen ? "block" : "hidden"
                  } absolute bottom-24 lg:right-42 lg:bottom-32 bg-white rounded shadow mt-2 p-4`}
                >
                  <div
                    className="cursor-pointer p-1 hover:bg-gray-100 rounded"
                    onClick={() => {
                      handleLanguageChange("en")
                      toggleLanguageMenu()
                    }}
                  >
                    {t("en")}
                  </div>
                  <div
                    className="cursor-pointer p-1 hover:bg-gray-100 rounded"
                    onClick={() => {
                      handleLanguageChange("fr")
                      toggleLanguageMenu()
                    }}
                  >
                    {t("fr")}
                  </div>
                  <div
                    className="cursor-pointer p-1 hover:bg-gray-100 rounded"
                    onClick={() => {
                      handleLanguageChange("am")
                      toggleLanguageMenu()
                    }}
                  >
                    {t("am")}
                  </div>
                  <div
                    className="cursor-pointer p-1 hover:bg-gray-100 rounded"
                    onClick={() => {
                      handleLanguageChange("hbr")
                      toggleLanguageMenu()
                    }}
                  >
                    {t("hbr")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Users
