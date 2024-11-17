import { AuthContextProvider } from "../../contexts/AuthContext"
import { LoginForm } from "../../types/login"
import { loginValidator } from "../../validators/login"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { Screen } from "../../components/base/Screen"
import { StackNavigationParams } from "../../../App"
import { StackNavigationProp } from "@react-navigation/stack"
import { StyleSheet, Text, View } from "react-native"
import AuthRedirect from "../../components/auth/AuthRedirect"
import Box from "../../components/base/Box"
import CustomButton from "../../components/customs/CustomButton"
import CustomInput from "../../components/customs/CustomInput"
import Loading from "../../components/base/Loading"
import React, { useState } from "react"
import validatorErrorParser from "../../validators/base/validatorErrorParser"

type LoginStackUseNavigationProps = StackNavigationProp<StackNavigationParams, "Login">
type LoginStackUseRouteProps = RouteProp<StackNavigationParams, "Login">

export const LoginScreen: React.FC<{}> = ({ }) => {
    // TODO: Não é possível acessar LoginScreen quando logado
    const stackNavigation = useNavigation<LoginStackUseNavigationProps>()
    const stackRoute = useRoute<LoginStackUseRouteProps>()
    const [ credentials, setCredentials ] = useState<LoginForm>({ email: undefined, password: undefined })
    const [ loading, setLoading ] = useState<boolean>(false)
    const { login } = AuthContextProvider()

    const loginAction = async () => {
        const parsedLogin = loginValidator.safeParse(credentials)

        if (!parsedLogin.success) {
            const errorMessage = validatorErrorParser(parsedLogin.error)
            alert(errorMessage)
            return
        }

        setLoading(true)
        await login({
            email: parsedLogin.data.email,
            password: parsedLogin.data.password
        })
        setLoading(false)
    }

    return (
        <AuthRedirect>
            <Screen>
                <Box.Center style={ styles.container }>
                    <Text style={ styles.title }>Realize seu login</Text>
                    <Box.Column style={ styles.container }>
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
                        {
                            loading
                                ? <Loading />
                                : <>
                                    <CustomButton title="Entrar" onPress={ loginAction } />
                                    <CustomButton title="Voltar" onPress={ () => stackNavigation.navigate("Info") } />
                                    <CustomButton title="Cadastre-se" onPress={ () => stackNavigation.navigate("Registry") } />
                                </>
                        }
                    </Box.Column>
                </Box.Center>
            </Screen>
        </AuthRedirect>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
    },
    container: {
        gap: 10,
    },
})