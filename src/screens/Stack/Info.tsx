import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { Screen } from "../../components/base/Screen"
import { StackNavigationParams } from "../../../App"
import { StackNavigationProp } from "@react-navigation/stack"
import { StyleSheet, Text } from "react-native"
import CustomButton from "../../components/CustomButton"
import React from "react"

type InfoStackUseNavigationProps = StackNavigationProp<StackNavigationParams, "Info">
type InfoStackUseRouteProps = RouteProp<StackNavigationParams, "Info">

export const InfoScreen: React.FC<{}> = ({ }) => {
    const stackNavigation = useNavigation<InfoStackUseNavigationProps>()
    const stackRoute = useRoute<InfoStackUseRouteProps>()

    return (
        <Screen>
            <Text>INFO</Text>
            <CustomButton title="Registry" onPress={ () => stackNavigation.navigate("Registry") } />
            <CustomButton title="Login" onPress={ () => stackNavigation.navigate("Login") } />
            <CustomButton title="Tabs" onPress={ () => stackNavigation.navigate("Tabs") } />
        </Screen>
    )
}

const styles = StyleSheet.create({
})