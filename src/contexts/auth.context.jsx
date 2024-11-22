import { createContext, useState } from "react"

const AuthContext = createContext()

function AuthProviderWrapper(props) {

    const [loggedUSer, SetLoggedUSer] = useState('logeao')
    const login = user => SetLoggedUSer(user)
    const logout = () => SetLoggedUSer(undefined)

    return (
        <AuthContext.Provider value={{ loggedUSer, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    )


}
export { AuthContext, AuthProviderWrapper }