import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { DreamsStackNavigationParams } from "../Tabs/Dreams"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { Screen } from "../../components/base/Screen"
import { StackNavigationParams, TabNavigationParams } from "../../../App"
import { StackNavigationProp } from "@react-navigation/stack"
import { StyleSheet, Text } from "react-native"
import Auth from "../../components/auth/Auth"
import CustomButton from "../../components/customs/CustomButton"
import React from "react"

type ExportDreamsRouteProps = RouteProp<DreamsStackNavigationParams, "ExportDreams">
type ExportDreamsProps = {
    route: ExportDreamsRouteProps
}

type ExportDreamsDreamsStackUseNavigationProps = StackNavigationProp<DreamsStackNavigationParams, "ExportDreams">
type ExportDreamsStackNavigationProps = StackNavigationProp<StackNavigationParams, "Tabs">
type ExportDreamsTabNavigationProps = BottomTabNavigationProp<TabNavigationParams, "Dreams">

export const ExportDreams: React.FC<ExportDreamsProps> = ({ route }) => {
    const dreamsStackNavigation = useNavigation<ExportDreamsDreamsStackUseNavigationProps>()
    const stackNavigation = useNavigation<ExportDreamsStackNavigationProps>()
    const tabNavigation = useNavigation<ExportDreamsTabNavigationProps>()

    return (
        <Auth>
            <Screen>
                <Text>EXPORT DREAMS</Text>
                <CustomButton
                    title="Voltar"
                    onPress={ () => dreamsStackNavigation.goBack() }
                />
            </Screen>
        </Auth>
    )
}

const styles = StyleSheet.create({
})