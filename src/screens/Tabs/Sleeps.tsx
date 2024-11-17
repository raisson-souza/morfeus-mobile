import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { CustomImage } from "../../components/customs/CustomImage"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { Screen } from "../../components/base/Screen"
import { StackNavigationParams, TabNavigationParams } from "../../../App"
import { StackNavigationProp } from "@react-navigation/stack"
import { StyleSheet } from "react-native"
import Auth from "../../components/auth/Auth"
import Box from "../../components/base/Box"
import React from "react"

type SleepsStackUseNavigationProps = StackNavigationProp<StackNavigationParams, "Tabs">
type SleepsStackUseRouteProps = RouteProp<StackNavigationParams, "Tabs">

type SleepsTabUseNavigationProps = BottomTabNavigationProp<TabNavigationParams, "Sleeps">
type SleepsTabUseRouteProps = RouteProp<TabNavigationParams, "Sleeps">

export const SleepsScreen: React.FC<{}> = ({ }) => {
    const stackNavigation = useNavigation<SleepsStackUseNavigationProps>()
    const tabNavigation = useNavigation<SleepsTabUseNavigationProps>()
    const stackRoute = useRoute<SleepsStackUseRouteProps>()
    const tabRoute = useRoute<SleepsTabUseRouteProps>()

    return (
        <Auth>
            <Screen>
                <Box.Center style={ styles.container }>
                    <CustomImage.Local
                        filePathByRequire={ require("../../assets/sleeps_background.jpg") }
                        style={ styles.image }
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
        height: 150,
        borderRadius: 10,
    },
})