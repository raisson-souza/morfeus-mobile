import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { Screen } from "../../components/base/Screen"
import { StackNavigationParams } from "../../../App"
import { StackNavigationProp } from "@react-navigation/stack"
import { StyleSheet, Text, TextInput, View } from "react-native"
import CustomButton from "../../components/customs/CustomButton"
import React, { useState } from "react"

type RegistryStackUseNavigationProps = StackNavigationProp<StackNavigationParams, "Registry">
type RegistryStackUseRouteProps = RouteProp<StackNavigationParams, "Registry">

export const RegistryScreen: React.FC<{}> = ({ }) => {
    // Não é possível acessar RegistryScreen quando logado
    const stackNavigation = useNavigation<RegistryStackUseNavigationProps>()
    const stackRoute = useRoute<RegistryStackUseRouteProps>()
    const [ credentials, setCredentials ] = useState<{
        email: string,
        password: string,
        passwordRepeat: string,
    }>({
        email: "",
        password: "",
        passwordRepeat: "",
    })

    const register = () => {
        // USAR VALIDADOR
        // SERVICE
    }

    return (
        <Screen>
            <Text>Cadastre-se</Text>
            <View>
                <View>
                    <Text>Email</Text>
                    <TextInput
                        placeholder="usuario@email.com"
                        textContentType="emailAddress"
                        defaultValue={ credentials.email }
                        onChangeText={ (e) => setCredentials({ email: e, password: credentials.password, passwordRepeat: credentials.passwordRepeat })}
                    />
                </View>
                <View>
                    <Text>Senha</Text>
                    <TextInput
                        placeholder="12345"
                        textContentType="password"
                        defaultValue={ credentials.password }
                        onChangeText={ (e) => setCredentials({ email: credentials.email, password: e, passwordRepeat: credentials.passwordRepeat })}
                    />
                </View>
                <View>
                    <Text>Repita a senha</Text>
                    <TextInput
                        placeholder="12345"
                        textContentType="password"
                        defaultValue={ credentials.passwordRepeat }
                        onChangeText={ (e) => setCredentials({ email: credentials.email, password: credentials.password, passwordRepeat: e })}
                    />
                </View>
            </View>
            <Text>CADASTRO</Text>
            <CustomButton title="Info" onPress={ () => stackNavigation.navigate("Info") } />
            <CustomButton title="Login" onPress={ () => stackNavigation.navigate("Login") } />
            <CustomButton title="Tabs" onPress={ () => stackNavigation.navigate("Tabs") } />
        </Screen>
    )
}

const styles = StyleSheet.create({
})