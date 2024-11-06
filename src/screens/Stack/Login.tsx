import { LoginCredentials } from "../../types/login"
import { loginValidator } from "../../validators/login"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { Screen } from "../../components/base/Screen"
import { StackNavigationParams } from "../../../App"
import { StackNavigationProp } from "@react-navigation/stack"
import { StyleSheet, Text, View } from "react-native"
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
    const [ credentials, setCredentials ] = useState<LoginCredentials>({ email: "", password: "" })

    const login = () => {
        const parsedLogin = loginValidator.safeParse(credentials)

        if (!parsedLogin.success) {
            const errorMessage = validatorErrorParser(parsedLogin.error)
            alert(errorMessage)
            return
        }

        // SERVICE
        stackNavigation.navigate("Tabs")
    }

    return (
        <Screen>
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
            <CustomButton title="Info" onPress={ () => stackNavigation.navigate("Info") } />
            <CustomButton title="Registry" onPress={ () => stackNavigation.navigate("Registry") } />
            <CustomButton title="Tabs" onPress={ () => stackNavigation.navigate("Tabs") } />
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