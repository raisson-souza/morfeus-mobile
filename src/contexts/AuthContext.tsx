import { createContext, useContext, useEffect, useState } from "react"
import { LocalStorage } from "../utils/LocalStorage"
import { Screen } from "../components/base/Screen"
import AuthService from "../services/api/AuthService"
import Loading from "../components/base/Loading"

type AuthContextProps = {
    children: JSX.Element | JSX.Element[]
}

type AuthContext = {
    isLogged: boolean
    /** Usando com o hook useTransition, pode não realizar um refresh no componente se necessário */
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = createContext<AuthContext | null>(null)

/** Context de autenticação, realiza o refresh do token de autenticação e valida credenciais no localStorage */
export default function AuthContextComponent({ children }: AuthContextProps) {
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ isLogged, setIsLogged ] = useState<boolean>(false)

    useEffect(() => {
        const fetchLogin = async () => {
            const loginCredentials = await LocalStorage.loginCredentials.get()

            const refreshResponse = await AuthService.Refresh({
                apiToken: await LocalStorage.apiToken.get() ?? undefined,
                email: loginCredentials?.email,
                password: loginCredentials?.password
            })

            if (refreshResponse.Success) {
                await LocalStorage.apiToken.set(refreshResponse.Data)
                setIsLogged(true)
            }
        }

        const shouldFetchLogin = async () => {
            const apiToken = await LocalStorage.apiToken.get()
            const credentials = await LocalStorage.loginCredentials.get()

            if (apiToken || credentials)
                fetchLogin()
            setLoading(false)
        }

        shouldFetchLogin()
    }, [])

    if (loading) {
        return (
            <Screen>
                { Loading() }
            </Screen>
        )
    }

    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged }}>
            { children }
        </AuthContext.Provider>
    )
}

export function AuthContextProvider() {
    const context = useContext(AuthContext)
    if (!context) throw new Error("AuthContext chamado fora do provider.")
    return context
}