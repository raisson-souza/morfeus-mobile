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

type CreateFastDreamRouteProps = RouteProp<DreamsStackNavigationParams, "CreateFastDream">
type CreateFastDreamProps = {
    route: CreateFastDreamRouteProps
}

type CreateFastDreamDreamsStackUseNavigationProps = StackNavigationProp<DreamsStackNavigationParams, "CreateFastDream">
type CreateFastDreamStackNavigationProps = StackNavigationProp<StackNavigationParams, "Tabs">
type CreateFastDreamTabNavigationProps = BottomTabNavigationProp<TabNavigationParams, "Dreams">

export const CreateFastDream: React.FC<CreateFastDreamProps> = ({ route }) => {
    const dreamsStackNavigation = useNavigation<CreateFastDreamDreamsStackUseNavigationProps>()
    const stackNavigation = useNavigation<CreateFastDreamStackNavigationProps>()
    const tabNavigation = useNavigation<CreateFastDreamTabNavigationProps>()

    return (
        <Auth>
            <Screen>
                <Text>CREATE FAST DREAM</Text>
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