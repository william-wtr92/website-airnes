import { createContext, useContext, useEffect, useState } from "react"
import createAPIClient from "../createAPIClient"
import signUpService from "../services/signUp"
import signInService from "../services/signIn"
import contactService from "@/web/services/contact.js"
import createCategoryService from "@/web/services/admin/addCategory"
import addAddressService from "../services/user/address/addAddress"
import patchUserService from "../services/user/patchUser"
import patchAddressService from "../services/user/address/patchAddress"
import deleteAddressService from "../services/user/address/deleteAddress"
import parseSession from "../parseSession"
import config from "../config"

const AppContext = createContext()

export const AppContextProvider = (props) => {
  const [session, setSession] = useState(null)
  const [jwt, setJWT] = useState(null)
  const api = createAPIClient({ jwt })

  const signUp = signUpService({ api })
  const signIn = signInService({ api, setSession, setJWT })
  const contact = contactService({ api })

  useEffect(() => {
    const jwt = localStorage.getItem(config.session.localStorageKey)

    if (!jwt) {
      return
    }

    const session = parseSession(jwt)

    setSession(session)
    setJWT({ jwt })
  }, [])

  const addCategory = createCategoryService({ api, jwt })
  const addAddress = addAddressService({ api, jwt })
  const patchUser = patchUserService({ api, jwt })
  const patchAddress = patchAddressService({ api })
  const deleteAddress = deleteAddressService({ api })

  return (
    <AppContext.Provider
      {...props}
      value={{
        actions: {
          signUp,
          signIn,
          contact,
          addCategory,
          addAddress,
          patchUser,
          patchAddress,
          deleteAddress,
        },
        state: {
          session,
        },
      }}
    />
  )
}

const useAppContext = () => useContext(AppContext)

export default useAppContext
