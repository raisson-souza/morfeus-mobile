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

type UpdateDreamRouteProps = RouteProp<DreamsStackNavigationParams, "UpdateDream">
type UpdateDreamProps = {
    route: UpdateDreamRouteProps
}

type UpdateDreamDreamsStackUseNavigationProps = StackNavigationProp<DreamsStackNavigationParams, "UpdateDream">
type UpdateDreamStackNavigationProps = StackNavigationProp<StackNavigationParams, "Tabs">
type UpdateDreamsTabNavigationProps = BottomTabNavigationProp<TabNavigationParams, "Dreams">

export const UpdateDream: React.FC<UpdateDreamProps> = ({ route }) => {
    const dreamsStackNavigation = useNavigation<UpdateDreamDreamsStackUseNavigationProps>()
    const stackNavigation = useNavigation<UpdateDreamStackNavigationProps>()
    const tabNavigation = useNavigation<UpdateDreamsTabNavigationProps>()

    return (
        <Auth>
            <Screen>
                <Text>UPDATE DREAM { route.params.id }</Text>
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