import { AuthContextProvider } from "../../contexts/AuthContext"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useEffect } from "react"

type AuthRedirectProps = {
    children: JSX.Element | JSX.Element[]
}

type AuthRedirectStackUseNavigationProps = StackNavigationProp<ParamListBase, string, undefined>

/**
 * Componente responsável pelo controle de rotas não autenticadas  
 * Realiza redirecionamento para a tela inicial
 * */
export default function AuthRedirect({ children }: AuthRedirectProps) {
    const navigation = useNavigation<AuthRedirectStackUseNavigationProps>()
    const { isLogged } = AuthContextProvider()

    useEffect(() => {
        if (isLogged) navigation.navigate("Tabs")
    }, [])

    return children
}