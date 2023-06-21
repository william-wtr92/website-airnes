import { createContext, useContext, useState, useEffect } from "react"
import createAPIClient from "@/web/createAPIClient"
import signUpService from "@/web/services/signUp"
import signInService from "@/web/services/signIn"
import logoutService from "@/web/services/logout"
import contactService from "@/web/services/contact.js"
import sendMailService from "@/web/services/sendMail"
import resetPwdService from "@/web/services/resetPwd"
import updateContactService from "@/web/services/admin/contacts/updateContact"
import createCategoryService from "@/web/services/admin/categories/addCategory"
import updateCategoryService from "@/web/services/admin/categories/updateCategory"
import deleteCategoryService from "@/web/services/admin/categories/deleteCategory"
import deleteContactService from "@/web/services/admin/contacts/deleteContact"
import addAddressService from "@/web/services/user/address/addAddress"
import patchUserService from "@/web/services/user/patchUser"
import deleteUserService from "@/web/services/user/deleteUser"
import patchAddressService from "@/web/services/user/address/patchAddress"
import deleteAddressService from "@/web/services/user/address/deleteAddress"
import addCarouselService from "@/web/services/admin/homepage/addCarousel"
import deleteCarouselService from "@/web/services/admin/homepage/deleteCarousel"
import orderCarouselService from "@/web/services/admin/homepage/orderCarousel"
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
import paymentService from "@/web/services/cart/payment"
import confirmOrderService from "@/web/services/cart/confirmOrder"
import cancelOrderService from "@/web/services/user/order/cancelOrder"
import returnProductService from "@/web/services/user/order/returnProduct"
import getAddressServices from "@/web/services/cart/getAddress"
import createMaterialService from "@/web/services/admin/materials/addMaterial"
import updateMaterialService from "@/web/services/admin/materials/updateMaterial"
import deleteMaterialService from "@/web/services/admin/materials/deleteMaterial"

import config from "@/web/config"
import { i18n } from "next-i18next"
import parseSession from "@/web/parseSession"
import { useRouter } from "next/router"

const AppContext = createContext()

export const AppContextProvider = (props) => {
  const { cartItems: initialCartItems, ...otherProps } = props

  const [readCookie, setReadCookie] = useState(false)
  const [session, setSession] = useState(null)
  const [jwt, setJWT] = useState(null)
  const api = createAPIClient({ jwt, baseURL: config.api.baseURL })
  const [cartItems, setCartItems] = useState(initialCartItems || [])

  const router = useRouter()

  const signUp = signUpService({ api })
  const signIn = signInService({ api, setSession, setJWT })
  const logout = logoutService({ api, setSession, setJWT })

  const contact = contactService({ api })
  const addCategory = createCategoryService({ api })
  const updateCategory = updateCategoryService({ api })
  const deleteCategory = deleteCategoryService({ api })

  const addProduct = createProductService({ api })
  const updateProduct = updateProductService({ api })
  const deleteProduct = deleteProductService({ api })

  const addMaterial = createMaterialService({ api })
  const updateMaterial = updateMaterialService({ api })
  const deleteMaterial = deleteMaterialService({ api })

  const updateContact = updateContactService({ api })
  const deleteContact = deleteContactService({ api })

  const sendMail = sendMailService({ api })
  const resetPwd = resetPwdService({ api })

  const addAddress = addAddressService({ api })
  const patchUser = patchUserService({ api })
  const patchRole = patchRoleService({ api })
  const patchAddress = patchAddressService({ api })

  const deleteUser = deleteUserService({ api })
  const deleteAddress = deleteAddressService({ api })

  const addCarousel = addCarouselService({ api })
  const deleteCarousel = deleteCarouselService({ api })
  const orderCarousel = orderCarouselService({ api })

  const deleteSelectedCategory = deleteSelectedCategoryService({ api })
  const orderSelectedCategory = orderSelectedCategoryService({ api })
  const addSelectedCategory = addSelectedCategoryService({ api })

  const deleteSelectedProduct = deleteSelectedProductService({ api })
  const orderSelectedProduct = orderSelectedProductService({ api })
  const addSelectedProduct = addSelectedProductService({ api })

  const payment = paymentService({ api })
  const confirmOrder = confirmOrderService({ api })
  const getAddress = getAddressServices({ api })

  const cancelOrder = cancelOrderService({ api })
  const returnProduct = returnProductService({ api })

  useEffect(() => {
    const jwt = localStorage.getItem(config.session.localStorageKey)

    if (!jwt) {
      return
    }

    const session = parseSession(jwt)

    setSession(session)
    setJWT(jwt)
  }, [])

  useEffect(() => {
    const hasAcceptedCookie = localStorage.getItem(
      config.acknowledgeCookie.localStorageKey
    )

    if (!hasAcceptedCookie) {
      return
    }

    setReadCookie(true)
  }, [])

  useEffect(() => {
    const storedCart = localStorage.getItem("cart")

    if (storedCart) {
      const parsedCart = JSON.parse(storedCart)
      setCartItems(parsedCart)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem(config.acknowledgeCookie.localStorageKey, "true")

    setReadCookie(true)
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem("cart")
  }

  const addToCart = (product) => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || []
    const existingItemIndex = currentCart.findIndex(
      (item) => item.id === product.id
    )

    const newCartItems =
      existingItemIndex !== -1
        ? [...currentCart]
        : [
            ...currentCart,
            {
              ...product,
              product_quantity: 1,
            },
          ]

    if (existingItemIndex !== -1) {
      newCartItems[existingItemIndex].product_quantity += 1
    }

    setCartItems(newCartItems)
    localStorage.setItem("cart", JSON.stringify(newCartItems))
  }

  const removeFromCart = (productId) => {
    const newCartItems = cartItems.filter((item) => item.id !== productId)
    setCartItems(newCartItems)
    localStorage.setItem("cart", JSON.stringify(newCartItems))
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

  const language = i18n ? i18n.language : "fr"

  const saveLanguageToLocalStorage = (language) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userLanguage", language)
    }
  }

  const changeLanguage = (language) => {
    if (i18n && language !== i18n.language) {
      i18n.changeLanguage(language)
      saveLanguageToLocalStorage(language)
      router.push(router.pathname, router.asPath, { locale: language })
    }
  }

  return (
    <AppContext.Provider
      {...otherProps}
      value={{
        actions: {
          acceptCookies,
          signUp,
          signIn,
          logout,
          contact,
          sendMail,
          resetPwd,
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
          addToCart,
          updateCartQuantity,
          removeFromCart,
          clearCart,
          changeLanguage,
          payment,
          confirmOrder,
          cancelOrder,
          returnProduct,
          getAddress,
          addMaterial,
          updateMaterial,
          deleteMaterial,
        },
        state: {
          readCookie,
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
