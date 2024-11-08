import { AuthContextProvider } from "../../contexts/AuthContext"
import { RegistryForm } from "../../types/registry"
import { registryValidator } from "../../validators/registry"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { Screen } from "../../components/base/Screen"
import { StackNavigationParams } from "../../../App"
import { StackNavigationProp } from "@react-navigation/stack"
import { StyleSheet, Text, View } from "react-native"
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
    const [ credentials, setCredentials ] = useState<RegistryForm>({
        fullName: undefined,
        email: undefined,
        password: undefined,
        passwordRepeat: undefined,
    })
    const { registry } = AuthContextProvider()

    const registryAction = async () => {
        const parsedRegistry = registryValidator.safeParse(credentials)

        if (!parsedRegistry.success) {
            const errorMessage = validatorErrorParser(parsedRegistry.error)
            alert(errorMessage)
            return
        }

        await registry({
            fullName: parsedRegistry.data.fullName,
            email: parsedRegistry.data.email,
            password: parsedRegistry.data.password
        })
    }

    return (
        <Screen>
            <View>
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
                <CustomButton title="Cadastrar-se" onPress={ registryAction } />
            </View>
            <View>
                <CustomButton title="Voltar" onPress={ () => stackNavigation.navigate("Info") } />
                <CustomButton title="Já tem uma conta?" onPress={ () => stackNavigation.navigate("Login") } />
            </View>
        </Screen>
    )
}

const styles = StyleSheet.create({
})