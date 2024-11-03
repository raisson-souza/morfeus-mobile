import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { Screen } from "../../components/base/Screen"
import { StackNavigationParams, TabNavigationParams } from "../../../App"
import { StackNavigationProp } from "@react-navigation/stack"
import { StyleSheet, Text } from "react-native"
import Auth from "../../components/base/Auth"
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
                <Text>NOITES DE SONO</Text>
            </Screen>
        </Auth>
    )
}

const styles = StyleSheet.create({
})