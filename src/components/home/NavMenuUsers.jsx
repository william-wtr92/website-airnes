import {NavLink} from "@/components/utils/NavLink"
import Image from "next/image"
import {Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon, UserIcon, XMarkIcon} from "@heroicons/react/24/solid"
import {useMediaQuery} from "react-responsive"
import {useState} from "react"

const NavMenuUsers = () => {
    const [showSearch, setShowSearch] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const isMobile = useMediaQuery({query: "(max-width: 600px)"})
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


    return <>
        <header className="bg-[#ffffff] sticky top-0 z-20">
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
                                    className="h-4 hover:scale-110 text-[#443021] relative top-px cursor-pointer left-5 z-20"
                                    color={"#615043"}
                                />
                                <input
                                    className={`px-6 rounded-lg border bg-transparent focus:outline-none focus:shadow-outline-blue text-white placeholder-[#443021] focus:border-white ${
                                        isMobile ? `z-10` : ``
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
                    <NavLink href="/user/userId/cart">
                        <ShoppingCartIcon
                            className={`${
                                showSearch && isMobile ? `Hide` : ``
                            }h-6 hover:scale-110 hover:text-[#b3825c]`}
                            color={"#615043"}
                        />
                    </NavLink>
                </div>
                <div className="ml-6 mr-4 lg:ml-10">
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
                    }w-1/6 h-screen bg-[#ffffffde] absolute inset-y-0 right-0 z-50`}
                >
                    <div>
                        <XMarkIcon
                            className="h-6 hover:cursor-pointer relative top-4 left-3 hover:scale-105"
                            onClick={showBurgerMenu}
                        />
                    </div>
                    <div className="flex flex-col mx-16 my-10
                    gap-10">

                        <div className="hover:text-[#615043] hover:scale-105">
                            <NavLink href="/user/login">
                                Connexion
                            </NavLink>
                        </div>
                        <div className="hover:text-[#615043] hover:scale-105">
                            <NavLink href="/category/allCategories">
                                Catégories
                            </NavLink>
                        </div>
                        <div className="hover:text-[#615043] hover:scale-105">
                            <NavLink href="/category/allProducts">
                                Produits
                            </NavLink>
                        </div>
                        <div className="hover:text-[#615043] hover:scale-105">
                            <NavLink href="/">
                                Promotions
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </>
}

export default NavMenuUsers