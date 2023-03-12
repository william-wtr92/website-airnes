import {createContext, useContext} from "react"
import createAPIClient from "../createAPIClient"
import signUpService from "@/web/services/signUp.js"
import contactService from "@/web/services/contact.js"

const AppContext = createContext()

export const AppContextProvider = (props) => {
    const api = createAPIClient()

    const signUp = signUpService({api})

    const contact = contactService({api})

    return (
        <AppContext.Provider
            {...props}
            value={{
                actions: {
                    signUp,
                    contact,
                },
            }}
        />
    )
}

const useAppContext = () => useContext(AppContext)

export default useAppContext
