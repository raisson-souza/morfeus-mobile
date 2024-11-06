import { RegistryCredentials } from "../../types/registry"
import { registryValidator } from "../../validators/registry"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { Screen } from "../../components/base/Screen"
import { StackNavigationParams } from "../../../App"
import { StackNavigationProp } from "@react-navigation/stack"
import { StyleSheet, Text, TextInput, View } from "react-native"
import CustomButton from "../../components/customs/CustomButton"
import CustomInput from "../../components/customs/CustomInput"
import React, { useState } from "react"
import validatorErrorParser from "../../validators/base/validatorErrorParser"

type RegistryStackUseNavigationProps = StackNavigationProp<StackNavigationParams, "Registry">
type RegistryStackUseRouteProps = RouteProp<StackNavigationParams, "Registry">

export const RegistryScreen: React.FC<{}> = ({ }) => {
    // Não é possível acessar RegistryScreen quando logado
    const stackNavigation = useNavigation<RegistryStackUseNavigationProps>()
    const stackRoute = useRoute<RegistryStackUseRouteProps>()
    const [ credentials, setCredentials ] = useState<RegistryCredentials>({
        fullName: undefined,
        email: undefined,
        password: undefined,
        passwordRepeat: undefined,
    })

    const register = () => {
        const parsedRegistry = registryValidator.safeParse(credentials)

        if (!parsedRegistry.success) {
            const errorMessage = validatorErrorParser(parsedRegistry.error)
            alert(errorMessage)
            return
        }

        // SERVICE
        stackNavigation.navigate("Login")
    }

    return (
        <Screen>
            <Text>Cadastre-se</Text>
            <View>
                <CustomInput
                    label="Nome"
                    placeHolder="Fulano"
                    defaultValue={ credentials.fullName }
                    onChange={ (e) => setCredentials({ fullName: e, email: credentials.email, password: credentials.password, passwordRepeat: credentials.passwordRepeat }) }
                />
                <CustomInput
                    label="Email"
                    placeHolder="usuario@email.com"
                    defaultValue={ credentials.email }
                    onChange={ (e) => setCredentials({ fullName: credentials.fullName, email: e, password: credentials.password, passwordRepeat: credentials.passwordRepeat }) }
                    innerProps={{
                        textContentType: "emailAddress"
                    }}
                />
                <CustomInput
                    label="Senha"
                    defaultValue={ credentials.password }
                    onChange={ (e) => setCredentials({ fullName: credentials.fullName, email: credentials.email, password: e, passwordRepeat: credentials.passwordRepeat }) }
                />
                <CustomInput
                    label="Repita a senha"
                    defaultValue={ credentials.passwordRepeat }
                    onChange={ (e) => setCredentials({ fullName: credentials.fullName, email: credentials.email, password: credentials.password, passwordRepeat: e }) }
                />
            </View>
            <CustomButton title="Cadastrar-se" onPress={ register } />

            <CustomButton title="Info" onPress={ () => stackNavigation.navigate("Info") } />
            <CustomButton title="Login" onPress={ () => stackNavigation.navigate("Login") } />
            <CustomButton title="Tabs" onPress={ () => stackNavigation.navigate("Tabs") } />
        </Screen>
    )
}

const styles = StyleSheet.create({
})