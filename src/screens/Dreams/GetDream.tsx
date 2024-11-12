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

type GetDreamRouteProps = RouteProp<DreamsStackNavigationParams, "GetDream">
type GetDreamProps = {
    route: GetDreamRouteProps
}

type GetDreamDreamsStackUseNavigationProps = StackNavigationProp<DreamsStackNavigationParams, "GetDream">
type GetDreamStackNavigationProps = StackNavigationProp<StackNavigationParams, "Tabs">
type GetDreamsTabNavigationProps = BottomTabNavigationProp<TabNavigationParams, "Dreams">

export const GetDream: React.FC<GetDreamProps> = ({ route }) => {
    const dreamsStackNavigation = useNavigation<GetDreamDreamsStackUseNavigationProps>()
    const stackNavigation = useNavigation<GetDreamStackNavigationProps>()
    const tabNavigation = useNavigation<GetDreamsTabNavigationProps>()

    return (
        <Auth>
            <Screen>
                <Text>GET DREAM { route.params.id }</Text>
                <CustomButton
                    title="EDITAR"
                    onPress={ () => dreamsStackNavigation.navigate("UpdateDream", { id: 1 }) }
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