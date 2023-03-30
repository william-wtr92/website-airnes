import { createContext, useContext, useEffect, useState } from "react"
import createAPIClient from "../createAPIClient"
import signUpService from "../services/signUp"
import signInService from "../services/signIn"
import contactService from "@/web/services/contact.js"
import updateContactService from "@/web/services/admin/updateContact"
import createCategoryService from "@/web/services/admin/addCategory"
import updateCategoryService from "@/web/services/admin/updateCategory"
import uploadFileService from "@/web/services/admin/uploadFile"
import addAddressService from "../services/user/address/addAddress"
import patchUserService from "../services/user/patchUser"
import deleteUserService from "../services/user/deleteUser"
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
  const updateCategory = updateCategoryService({ api, jwt })
  const updateContact = updateContactService({ api })
  const addAddress = addAddressService({ api, jwt })
  const patchUser = patchUserService({ api })
  const patchAddress = patchAddressService({ api })

  const deleteUser = deleteUserService({ api })
  const deleteAddress = deleteAddressService({ api })

  const uploadFile = uploadFileService({ api })

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
          addAddress,
          patchUser,
          patchAddress,
          deleteUser,
          deleteAddress,
          uploadFile,
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
