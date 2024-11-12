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

type DreamsListRouteProps = RouteProp<DreamsStackNavigationParams, "DreamsList">
type DreamsListProps = {
    route: DreamsListRouteProps
}

type DreamsListDreamsStackUseNavigationProps = StackNavigationProp<DreamsStackNavigationParams, "DreamsList">
type DreamsListStackNavigationProps = StackNavigationProp<StackNavigationParams, "Tabs">
type DreamsListsTabNavigationProps = BottomTabNavigationProp<TabNavigationParams, "Dreams">

export const DreamsList: React.FC<DreamsListProps> = ({ route }) => {
    const dreamsStackNavigation = useNavigation<DreamsListDreamsStackUseNavigationProps>()
    const stackNavigation = useNavigation<DreamsListStackNavigationProps>()
    const tabNavigation = useNavigation<DreamsListsTabNavigationProps>()

    return (
        <Auth>
            <Screen>
                <Text>DREAMS LIST</Text>
                <CustomButton
                    title="SONHO TESTE"
                    onPress={ () => dreamsStackNavigation.navigate("GetDream", { id: 1 }) }
                />
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