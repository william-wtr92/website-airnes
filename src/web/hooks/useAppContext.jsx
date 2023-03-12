import { createContext, useContext } from "react"
import createAPIClient from "../createAPIClient"
import signUpService from "@/web/services/signUp.js"

const AppContext = createContext()

export const AppContextProvider = (props) => {
  const api = createAPIClient()

  const signUp = signUpService({ api })

  return (
    <AppContext.Provider
      {...props}
      value={{
        actions: {
          signUp,
        },
      }}
    />
  )
}

const useAppContext = () => useContext(AppContext)

export default useAppContext
