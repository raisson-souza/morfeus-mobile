import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { DreamsStackNavigationParams } from "../../routes/Dreams"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { Screen } from "../../components/base/Screen"
import { StackNavigationParams, TabNavigationParams } from "../../../App"
import { StackNavigationProp } from "@react-navigation/stack"
import { StyleSheet, Text } from "react-native"
import Auth from "../../components/auth/Auth"
import CustomButton from "../../components/customs/CustomButton"
import React from "react"

type DreamsHomeRouteProps = RouteProp<DreamsStackNavigationParams, "DreamsHome">
type DreamsHomeProps = {
    route: DreamsHomeRouteProps
}

type DreamsHomeDreamsStackUseNavigationProps = StackNavigationProp<DreamsStackNavigationParams, "DreamsHome">
type DreamsHomeStackNavigationProps = StackNavigationProp<StackNavigationParams, "Tabs">
type DreamsHomeTabNavigationProps = BottomTabNavigationProp<TabNavigationParams, "Dreams">

export const DreamsHome: React.FC<DreamsHomeProps> = ({ route }) => {
    const dreamsStackNavigation = useNavigation<DreamsHomeDreamsStackUseNavigationProps>()
    const stackNavigation = useNavigation<DreamsHomeStackNavigationProps>()
    const tabNavigation = useNavigation<DreamsHomeTabNavigationProps>()

    return (
        <Auth>
            <Screen>
                <Text>DREAMS HOME</Text>
                <CustomButton
                    title="Listagem de sonhos"
                    onPress={ () => dreamsStackNavigation.navigate("DreamsList") }
                />
            </Screen>
        </Auth>
    )
}

const styles = StyleSheet.create({
})