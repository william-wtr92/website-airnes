import { createContext, useContext, useEffect, useState } from "react"
import createAPIClient from "../createAPIClient"
import signUpService from "../services/signUp"
import signInService from "../services/signIn"
import contactService from "@/web/services/contact.js"
import updateContactService from "@/web/services/admin/contacts/updateContact"
import createCategoryService from "@/web/services/admin/categories/addCategory"
import updateCategoryService from "@/web/services/admin/categories/updateCategory"
import deleteCategoryService from "@/web/services/admin/categories/deleteCategory"
import deleteContactService from "@/web/services/admin/contacts/deleteContact"
import addAddressService from "../services/user/address/addAddress"
import patchUserService from "../services/user/patchUser"
import deleteUserService from "../services/user/deleteUser"
import patchAddressService from "../services/user/address/patchAddress"
import deleteAddressService from "../services/user/address/deleteAddress"
import addCarouselService from "../services/admin/homepage/addCarousel"
import deleteCarouselService from "../services/admin/homepage/deleteCarousel"
import orderCarouselService from "../services/admin/homepage/orderCarousel"
import createProductService from "@/web/services/admin/products/addProduct"
import updateProductService from "@/web/services/admin/products/updateProduct"
import deleteProductService from "@/web/services/admin/products/deleteProduct"
import deleteSelectedCategoryService from "@/web/services/admin/homepage/deleteSelectedCategory"
import orderSelectedCategoryService from "@/web/services/admin/homepage/orderSelectedCategory"
import addSelectedCategoryService from "@/web/services/admin/homepage/addSelectedCategory"
import addSelectedProductService from "@/web/services/admin/homepage/addSelectedProduct"
import deleteSelectedProductService from "@/web/services/admin/homepage/deleteSelectedProduct"
import orderSelectedProductService from "@/web/services/admin/homepage/orderSelectedProduct"
import patchRoleService from "@/web/services/admin/users/updateRole"

import config from "../config"
import Cookies from "js-cookie"
import { getSessionFromCookies } from "../helper/getSessionFromCookies"

const AppContext = createContext()

export const AppContextProvider = ({
  cartItems: initialCartItems,
  ...props
}) => {
  const [session, setSession] = useState(null)
  const [jwt, setJWT] = useState(null)
  const api = createAPIClient({ jwt })

  const signUp = signUpService({ api })
  const signIn = signInService({ api, setSession, setJWT })
  const logout = () => {
    clearCart()
    setSession(null)
    setJWT(null)
    Cookies.remove(config.session.localStorageKey)
  }

  const contact = contactService({ api })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateSessionFromCookies = () => {
        const sessionFromCookies = getSessionFromCookies()

        if (sessionFromCookies) {
          setSession(sessionFromCookies)
          const jwt = Cookies.get(config.session.localStorageKey)

          if (jwt) {
            setJWT(jwt)
          }
        }
      }

      updateSessionFromCookies()
      window.addEventListener("storage", updateSessionFromCookies)

      return () => {
        window.removeEventListener("storage", updateSessionFromCookies)
      }
    }
  }, [])

  const addCategory = createCategoryService({ api, jwt })
  const updateCategory = updateCategoryService({ api, jwt })
  const deleteCategory = deleteCategoryService({ api, jwt })

  const addProduct = createProductService({ api, jwt })
  const updateProduct = updateProductService({ api, jwt })
  const deleteProduct = deleteProductService({ api, jwt })

  const updateContact = updateContactService({ api })
  const deleteContact = deleteContactService({ api })

  const addAddress = addAddressService({ api, jwt })
  const patchUser = patchUserService({ api })
  const patchRole = patchRoleService({ api })
  const patchAddress = patchAddressService({ api })

  const deleteUser = deleteUserService({ api })
  const deleteAddress = deleteAddressService({ api })

  const addCarousel = addCarouselService({ api, jwt })
  const deleteCarousel = deleteCarouselService({ api })
  const orderCarousel = orderCarouselService({ api })

  const deleteSelectedCategory = deleteSelectedCategoryService({ api })
  const orderSelectedCategory = orderSelectedCategoryService({ api, jwt })
  const addSelectedCategory = addSelectedCategoryService({ api, jwt })

  const deleteSelectedProduct = deleteSelectedProductService({ api })
  const orderSelectedProduct = orderSelectedProductService({ api, jwt })
  const addSelectedProduct = addSelectedProductService({ api, jwt })

  const [cartItems, setCartItems] = useState(initialCartItems || [])

  useEffect(() => {
    const storedCart = localStorage.getItem("cart")

    if (storedCart) {
      const parsedCart = JSON.parse(storedCart)
      setCartItems(parsedCart)
    }
  }, [])

  const addToCart = (product) => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || []
    const existingItemIndex = currentCart.findIndex(
      (item) => item.id === product.id
    )

    let newCartItems = []

    if (existingItemIndex !== -1) {
      newCartItems = [...currentCart]
      newCartItems[existingItemIndex].product_quantity += 1
    } else {
      newCartItems = [...currentCart, { ...product, product_quantity: 1 }]
    }

    setCartItems(newCartItems)
    localStorage.setItem("cart", JSON.stringify(newCartItems))
  }

  const removeFromCart = (productId) => {
    const newCartItems = cartItems.filter((item) => item.id !== productId)
    setCartItems(newCartItems)
    localStorage.setItem("cart", JSON.stringify(newCartItems))
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem("cart")
  }

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      const updatedCartItems = cartItems.map((item) => {
        if (item.id === productId) {
          return { ...item, product_quantity: newQuantity }
        }

        return item
      })
      setCartItems(updatedCartItems)
      localStorage.setItem("cart", JSON.stringify(updatedCartItems))
    }
  }

  const [language, setLanguage] = useState("fr")

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage)
  }

  return (
    <AppContext.Provider
      {...props}
      value={{
        actions: {
          signUp,
          signIn,
          contact,
          updateContact,
          addCategory,
          updateCategory,
          deleteCategory,
          deleteContact,
          addAddress,
          patchUser,
          patchRole,
          patchAddress,
          deleteUser,
          deleteAddress,
          addCarousel,
          deleteCarousel,
          orderCarousel,
          addProduct,
          updateProduct,
          deleteProduct,
          deleteSelectedCategory,
          orderSelectedCategory,
          addSelectedCategory,
          addSelectedProduct,
          deleteSelectedProduct,
          orderSelectedProduct,
          logout,
          addToCart,
          clearCart,
          updateCartQuantity,
          removeFromCart,
          changeLanguage,
        },
        state: {
          session,
          cartItems,
          language,
        },
      }}
    />
  )
}

const useAppContext = () => useContext(AppContext)

export default useAppContext
