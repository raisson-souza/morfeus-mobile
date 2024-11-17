import { AuthContextProvider } from "../../contexts/AuthContext"
import { CustomImage } from "../../components/customs/CustomImage"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { Screen } from "../../components/base/Screen"
import { StackNavigationParams } from "../../../App"
import { StackNavigationProp } from "@react-navigation/stack"
import { StyleSheet, Text } from "react-native"
import Box from "../../components/base/Box"
import CustomButton from "../../components/customs/CustomButton"
import React from "react"

type InfoStackUseNavigationProps = StackNavigationProp<StackNavigationParams, "Info">
type InfoStackUseRouteProps = RouteProp<StackNavigationParams, "Info">

export const InfoScreen: React.FC<{}> = ({ }) => {
    const stackNavigation = useNavigation<InfoStackUseNavigationProps>()
    const stackRoute = useRoute<InfoStackUseRouteProps>()
    const authContext = AuthContextProvider()
    const btnWidth = 150

    return (
        <Screen>
            <Box.Center style={ styles.container }>
                <CustomImage.Local
                    filePathByRequire={ require("../../../assets/morfeus_logo.png") }
                />
                <Text style={ styles.description }>Uma aplicação que realiza o controle do ciclo do sono e gerenciamento de sonhos.</Text>
                {
                    authContext.isLogged
                        ? (
                            <>
                                <CustomButton btnWidth={ btnWidth } title="Entrar" onPress={ () => stackNavigation.navigate("Tabs") } />
                            </>
                        )
                        : (
                            <Box.Column style={ styles.notLogged }>
                                <CustomButton btnWidth={ btnWidth } title="Cadastre-se" onPress={ () => stackNavigation.navigate("Registry") } />
                                <CustomButton btnWidth={ btnWidth } title="Login" onPress={ () => stackNavigation.navigate("Login") } />
                            </Box.Column>
                        )
                }
            </Box.Center>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 10,
    },
    description: {
        textAlign: "center",
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
    },
    notLogged: {
        gap: 10,
    },
})