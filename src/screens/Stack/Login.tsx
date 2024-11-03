import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { Screen } from "../../components/base/Screen"
import { StackNavigationParams } from "../../../App"
import { StackNavigationProp } from "@react-navigation/stack"
import { StyleSheet, Text } from "react-native"
import CustomButton from "../../components/CustomButton"
import React from "react"

type LoginStackUseNavigationProps = StackNavigationProp<StackNavigationParams, "Login">
type LoginStackUseRouteProps = RouteProp<StackNavigationParams, "Login">

export const LoginScreen: React.FC<{}> = ({ }) => {
    const stackNavigation = useNavigation<LoginStackUseNavigationProps>()
    const stackRoute = useRoute<LoginStackUseRouteProps>()

    return (
        <Screen>
            <Text>LOGIN</Text>
            <CustomButton title="Info" onPress={ () => stackNavigation.navigate("Info") } />
            <CustomButton title="Registry" onPress={ () => stackNavigation.navigate("Registry") } />
            <CustomButton title="Tabs" onPress={ () => stackNavigation.navigate("Tabs") } />
        </Screen>
    )
}

const styles = StyleSheet.create({
})