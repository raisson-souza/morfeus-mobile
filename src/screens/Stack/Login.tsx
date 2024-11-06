import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { Screen } from "../../components/base/Screen"
import { StackNavigationParams } from "../../../App"
import { StackNavigationProp } from "@react-navigation/stack"
import { StyleSheet, Text, TextInput, View } from "react-native"
import CustomButton from "../../components/CustomButton"
import React, { useState } from "react"

type LoginStackUseNavigationProps = StackNavigationProp<StackNavigationParams, "Login">
type LoginStackUseRouteProps = RouteProp<StackNavigationParams, "Login">

export const LoginScreen: React.FC<{}> = ({ }) => {
    // Não é possível acessar LoginScreen quando logado
    const stackNavigation = useNavigation<LoginStackUseNavigationProps>()
    const stackRoute = useRoute<LoginStackUseRouteProps>()
    const [ credentials, setCredentials ] = useState<{ email: string, password: string }>({ email: "", password: "" })

    const login = () => {
        // USAR VALIDADOR
        // SERVICE
    }

    return (
        <Screen>
            <Text>Realize seu login</Text>
            <View style={ styles.container }>
                <View>
                    <Text>Email</Text>
                    <TextInput
                        placeholder="usuario@email.com"
                        textContentType="emailAddress"
                        defaultValue={ credentials.email }
                        onChangeText={ (e) => setCredentials({ email: e, password: credentials.password })}
                    />
                </View>
                <View>
                    <Text>Senha</Text>
                    <TextInput
                        placeholder="12345"
                        textContentType="password"
                        defaultValue={ credentials.password }
                        onChangeText={ (e) => setCredentials({ email: credentials.email, password: e })}
                    />
                </View>
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