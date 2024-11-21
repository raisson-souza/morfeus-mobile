import { AuthContextProvider } from "../../contexts/AuthContext"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { CustomImage } from "../../components/customs/CustomImage"
import { ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { Screen } from "../../components/base/Screen"
import { StackNavigationParams, TabNavigationParams } from "../../../App"
import { StackNavigationProp } from "@react-navigation/stack"
import { StyleSheet, Text } from "react-native"
import Auth from "../../components/auth/Auth"
import Box from "../../components/base/Box"
import CustomButton from "../../components/customs/CustomButton"
import FutureDevelopmentButton from "../../components/FutureDevelopmentButton"
import React, { useState } from "react"
import SimpleSleep from "./components/SimpleSleep"

type HomeStackUseNavigationProps = StackNavigationProp<StackNavigationParams, "Tabs">
type HomeStackUseRouteProps = RouteProp<StackNavigationParams, "Tabs">

type HomeTabUseNavigationProps = BottomTabNavigationProp<TabNavigationParams, "Home">
type HomeTabUseRouteProps = RouteProp<TabNavigationParams, "Home">

export const HomeScreen: React.FC<{}> = ({ }) => {
    const stackNavigation = useNavigation<HomeStackUseNavigationProps>()
    const tabNavigation = useNavigation<HomeTabUseNavigationProps>()
    const stackRoute = useRoute<HomeStackUseRouteProps>()
    const tabRoute = useRoute<HomeTabUseRouteProps>()
    const dreamsStackNavigation = useNavigation<StackNavigationProp<ParamListBase, string, undefined>>()
    const { userInfo } = AuthContextProvider()
    const [ loadingSimpleSleep, setLoadingSimpleSleep ] = useState<boolean>(true)

    return (
        <Auth>
            <Screen>
                <Box.Center style={ styles.container }>
                    <Text style={ styles.welcome }>Bem vindo de volta, { userInfo.current.name }!</Text>
                    <CustomImage.Local
                        filePathByRequire={ require("../../assets/home_background.jpg") }
                        style={ styles.image }
                    />
                    <SimpleSleep />
                    {
                        loadingSimpleSleep
                            ? <></>
                            : <></>
                    }
                    <CustomButton
                        title="Criar Sonho"
                        onPress={ () => dreamsStackNavigation.navigate("CreateDream") }
                    />
                    <FutureDevelopmentButton btnTitle="Criar Sonho Rápido"/>
                    {/* <CustomButton
                        title="Criar Sonho Rápido"
                        onPress={ () => dreamsStackNavigation.navigate("CreateFastDream") }
                    /> */}
                    <CustomButton
                        title="Criar Noite de Sono"
                        onPress={ () => dreamsStackNavigation.navigate("CreateSleep") }
                    />
                </Box.Center>
            </Screen>
        </Auth>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        gap: 10.
    },
    image: {
        resizeMode: "cover",
        width: "100%",
        height: 200,
        borderRadius: 10,
    },
    welcome: {
        fontSize: 20,
        fontWeight: "bold"
    }
})