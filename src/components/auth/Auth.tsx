import { AuthContextProvider } from "../../contexts/AuthContext"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useEffect } from "react"

type AuthProps = {
    children: JSX.Element | JSX.Element[]
}

type AuthStackUseNavigationProps = StackNavigationProp<ParamListBase, string, undefined>

/**
 * Componente responsável pelo controle de rotas autenticadas  
 * Oferece redirecionamento ou outras tratativas quando usuário não autenticado  
 * Necessita englobar o componente necessitado de autenticação
 * */
export default function Auth({ children }: AuthProps) {
    const navigation = useNavigation<AuthStackUseNavigationProps>()
    const { isLogged } = AuthContextProvider()

    useEffect(() => {
        if (!isLogged) navigation.navigate("Login")
    }, [])

    return children
}