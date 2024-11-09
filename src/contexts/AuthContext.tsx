import { createContext, useContext, useEffect, useRef, useState, useTransition } from "react"
import { LocalStorage } from "../utils/LocalStorage"
import { LoginRequest } from "../types/login"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { RegistryRequest } from "../types/registry"
import { Screen } from "../components/base/Screen"
import { StackNavigationProp } from "@react-navigation/stack"
import AuthService from "../services/api/AuthService"
import Loading from "../components/base/Loading"

type AuthStackUseNavigationProps = StackNavigationProp<ParamListBase, string, undefined>

type AuthContextProps = {
    children: JSX.Element | JSX.Element[]
}

type AuthContext = {
    isLogged: boolean
    /** Usando com o hook useTransition, pode não realizar um refresh no componente se necessário */
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
    /** Função de login */
    login: (credentials: LoginRequest) => Promise<void>
    /** Função de cadastro */
    registry: (credentials: RegistryRequest) => Promise<void>
    /** Função de logoff */
    logoff: () => Promise<void>
}

const AuthContext = createContext<AuthContext | null>(null)

/** Context de autenticação, realiza o refresh do token de autenticação e valida credenciais no localStorage */
export default function AuthContextComponent({ children }: AuthContextProps) {
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ isLogged, setIsLogged ] = useState<boolean>(false)
    const navigation = useNavigation<AuthStackUseNavigationProps>()

    useEffect(() => {
        const manageAuth = async () => {
            const loginCredentials = await LocalStorage.loginCredentials.get()
            const tokenInfo = await LocalStorage.tokenInfo.get()

            // Verificamos se há token ativo ainda válido
            if (tokenInfo) {
                if ((new Date().getTime() / 1000) < tokenInfo.tokenExpirationDateMilis) {
                    setIsLogged(true)
                    setLoading(false)
                    return
                }
            }

            // Caso não haja token válido, é realizado login se houver credenciais
            if (loginCredentials) {
                const loginResponse = await AuthService.Login({
                    email: loginCredentials.email,
                    password: loginCredentials.password
                })

                if (loginResponse.Success) {
                    await LocalStorage.login(
                        {
                            token: loginResponse.Data.token,
                            tokenExpirationDateMilis: loginResponse.Data.expirationDateMilis
                        },
                        {
                            email: loginCredentials.email,
                            password: loginCredentials.password
                        }
                    )
                    setIsLogged(true)
                }
            }

            setLoading(false)
        }

        if (!isLogged)
            manageAuth()
    }, [])

    const login = async (credentials: LoginRequest) => {
        const loginResponse = await AuthService.Login({
            email: credentials.email,
            password: credentials.password
        })

        if (loginResponse.Success) {
            await LocalStorage.login(
                {
                    token: loginResponse.Data.token,
                    tokenExpirationDateMilis: loginResponse.Data.expirationDateMilis
                },
                {
                    email: credentials.email,
                    password: credentials.password
                }
            )
            setIsLogged(true)
            navigation.navigate("Tabs")
            return
        }

        alert(loginResponse.ErrorMessage)
    }

    const registry = async (credentials: RegistryRequest) => {
        const registryResponse = await AuthService.Registry({
            fullName: credentials.fullName,
            email: credentials.email,
            password: credentials.password
        })

        if (registryResponse.Success) {
            navigation.navigate("Login")
            return
        }

        alert(registryResponse.ErrorMessage)
    }

    const logoff = async () => {
        setLoading(true)
        await LocalStorage.logoff()
        setIsLogged(false)
        setLoading(false)
    }

    if (loading) {
        return (
            <Screen>
                { Loading() }
            </Screen>
        )
    }

    return (
        <AuthContext.Provider value={{
            isLogged,
            setIsLogged,
            login,
            registry,
            logoff,
        }}>
            { children }
        </AuthContext.Provider>
    )
}

export function AuthContextProvider() {
    const context = useContext(AuthContext)
    if (!context) throw new Error("AuthContext chamado fora do provider.")
    return context
}