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

type ImportDreamsRouteProps = RouteProp<DreamsStackNavigationParams, "ImportDreams">
type ImportDreamsProps = {
    route: ImportDreamsRouteProps
}

type ImportDreamsDreamsStackUseNavigationProps = StackNavigationProp<DreamsStackNavigationParams, "ImportDreams">
type ImportDreamsStackNavigationProps = StackNavigationProp<StackNavigationParams, "Tabs">
type ImportDreamsTabNavigationProps = BottomTabNavigationProp<TabNavigationParams, "Dreams">

export const ImportDreams: React.FC<ImportDreamsProps> = ({ route }) => {
    const dreamsStackNavigation = useNavigation<ImportDreamsDreamsStackUseNavigationProps>()
    const stackNavigation = useNavigation<ImportDreamsStackNavigationProps>()
    const tabNavigation = useNavigation<ImportDreamsTabNavigationProps>()

    return (
        <Auth>
            <Screen>
                <Text>IMPORT DREAMS</Text>
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