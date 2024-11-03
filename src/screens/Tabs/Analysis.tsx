import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { Screen } from "../../components/base/Screen"
import { StackNavigationParams, TabNavigationParams } from "../../../App"
import { StackNavigationProp } from "@react-navigation/stack"
import { StyleSheet, Text } from "react-native"
import Auth from "../../components/base/Auth"
import React from "react"

type AnalysisStackUseNavigationProps = StackNavigationProp<StackNavigationParams, "Tabs">
type AnalysisStackUseRouteProps = RouteProp<StackNavigationParams, "Tabs">

type AnalysisTabUseNavigationProps = BottomTabNavigationProp<TabNavigationParams, "Analysis">
type AnalysisTabUseRouteProps = RouteProp<TabNavigationParams, "Analysis">

export const AnalysisScreen: React.FC<{}> = ({ }) => {
    const stackNavigation = useNavigation<AnalysisStackUseNavigationProps>()
    const tabNavigation = useNavigation<AnalysisTabUseNavigationProps>()
    const stackRoute = useRoute<AnalysisStackUseRouteProps>()
    const tabRoute = useRoute<AnalysisTabUseRouteProps>()

    return (
        <Auth>
            <Screen>
                <Text>ANÁLISES</Text>
            </Screen>
        </Auth>
    )
}

const styles = StyleSheet.create({
})