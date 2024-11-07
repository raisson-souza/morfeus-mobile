import { AuthContextProvider } from "../../contexts/AuthContext"
import { LocalStorage } from "../../utils/LocalStorage"
import { LoginCredentials } from "../../types/login"
import { loginValidator } from "../../validators/login"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { Screen } from "../../components/base/Screen"
import { StackNavigationParams } from "../../../App"
import { StackNavigationProp } from "@react-navigation/stack"
import { StyleSheet, Text, View } from "react-native"
import AuthService from "../../services/api/AuthService"
import CustomButton from "../../components/customs/CustomButton"
import CustomInput from "../../components/customs/CustomInput"
import React, { useState } from "react"
import validatorErrorParser from "../../validators/base/validatorErrorParser"

type LoginStackUseNavigationProps = StackNavigationProp<StackNavigationParams, "Login">
type LoginStackUseRouteProps = RouteProp<StackNavigationParams, "Login">

export const LoginScreen: React.FC<{}> = ({ }) => {
    // Não é possível acessar LoginScreen quando logado
    const stackNavigation = useNavigation<LoginStackUseNavigationProps>()
    const stackRoute = useRoute<LoginStackUseRouteProps>()
    const [ credentials, setCredentials ] = useState<LoginCredentials>({ email: undefined, password: undefined })
    const authContext = AuthContextProvider()

    const login = async () => {
        const parsedLogin = loginValidator.safeParse(credentials)

        if (!parsedLogin.success) {
            const errorMessage = validatorErrorParser(parsedLogin.error)
            alert(errorMessage)
            return
        }

        const loginResponse = await AuthService.Login({
            email: parsedLogin.data.email,
            password: parsedLogin.data.password
        })

        if (loginResponse.Success) {
            await LocalStorage.login(loginResponse.Data, { email: parsedLogin.data.email, password: parsedLogin.data.password })
            authContext.setIsLogged(true)
            stackNavigation.navigate("Tabs")
            return
        }

        alert(loginResponse.ErrorMessage)
    }

    return (
        <Screen>
            <View>
                <Text>Realize seu login</Text>
                <View style={ styles.container }>
                    <CustomInput
                        label="Email"
                        placeHolder="usuario@email.com"
                        defaultValue={ credentials.email }
                        onChange={ (e) => setCredentials({ email: e, password: credentials.password }) }
                        innerProps={{
                            textContentType: "emailAddress"
                        }}
                    />
                    <CustomInput
                        label="Senha"
                        defaultValue={ credentials.password }
                        onChange={ (e) => setCredentials({ email: credentials.email, password: e }) }
                    />
                    <CustomButton
                        title="Entrar"
                        onPress={ login }
                    />
                </View>
            </View>
            <View>
                <CustomButton title="Voltar" onPress={ () => stackNavigation.navigate("Info") } />
                <CustomButton title="Cadastre-se" onPress={ () => stackNavigation.navigate("Registry") } />
            </View>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        textAlign: "center",
        textAlignVertical: "center",
        flexDirection: "column",
        gap: 10,
    },
})