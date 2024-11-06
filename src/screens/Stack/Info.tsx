import { AuthContextProvider } from "../../contexts/AuthContext"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { Screen } from "../../components/base/Screen"
import { StackNavigationParams } from "../../../App"
import { StackNavigationProp } from "@react-navigation/stack"
import { StyleSheet, Text, View } from "react-native"
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
            <View style={ styles.container }>
                <Text style={ styles.title }>Morfeus</Text>
                <Text>Uma aplicação para o controle do ciclo do sono e gerenciamento de sonhos</Text>
                {
                    authContext.isLogged
                        ? (
                            <>
                                <CustomButton btnWidth={ btnWidth } title="Entrar" onPress={ () => stackNavigation.navigate("Tabs") } />
                            </>
                        )
                        : (
                            <>
                                <CustomButton btnWidth={ btnWidth } title="Cadastre-se" onPress={ () => stackNavigation.navigate("Registry") } />
                                <CustomButton btnWidth={ btnWidth } title="Login" onPress={ () => stackNavigation.navigate("Login") } />
                            </>
                        )
                }
            </View>
            <CustomButton title="Registry" onPress={ () => stackNavigation.navigate("Registry") } />
            <CustomButton title="Login" onPress={ () => stackNavigation.navigate("Login") } />
            <CustomButton title="Tabs" onPress={ () => stackNavigation.navigate("Tabs") } />
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        textAlign: "center",
        textAlignVertical: "center",
        flexDirection: "column",
        gap: 10,
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
    },
})