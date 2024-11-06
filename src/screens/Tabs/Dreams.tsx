import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { Screen } from "../../components/base/Screen"
import { StackNavigationParams, TabNavigationParams } from "../../../App"
import { StackNavigationProp } from "@react-navigation/stack"
import { StyleSheet, Text } from "react-native"
import Auth from "../../components/auth/Auth"
import React from "react"

type DreamsStackUseNavigationProps = StackNavigationProp<StackNavigationParams, "Tabs">
type DreamsStackUseRouteProps = RouteProp<StackNavigationParams, "Tabs">

type DreamsTabUseNavigationProps = BottomTabNavigationProp<TabNavigationParams, "Dreams">
type DreamsTabUseRouteProps = RouteProp<TabNavigationParams, "Dreams">

export const DreamsScreen: React.FC<{}> = ({ }) => {
    const stackNavigation = useNavigation<DreamsStackUseNavigationProps>()
    const tabNavigation = useNavigation<DreamsTabUseNavigationProps>()
    const stackRoute = useRoute<DreamsStackUseRouteProps>()
    const tabRoute = useRoute<DreamsTabUseRouteProps>()

    return (
        <Auth>
            <Screen>
                <Text>SONHOS</Text>
            </Screen>
        </Auth>
    )
}

const styles = StyleSheet.create({
})