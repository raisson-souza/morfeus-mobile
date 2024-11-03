import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { Screen } from "../../components/base/Screen"
import { StackNavigationParams } from "../../../App"
import { StackNavigationProp } from "@react-navigation/stack"
import { StyleSheet, Text } from "react-native"
import CustomButton from "../../components/CustomButton"
import React from "react"

type RegistryStackUseNavigationProps = StackNavigationProp<StackNavigationParams, "Registry">
type RegistryStackUseRouteProps = RouteProp<StackNavigationParams, "Registry">

export const RegistryScreen: React.FC<{}> = ({ }) => {
    const stackNavigation = useNavigation<RegistryStackUseNavigationProps>()
    const stackRoute = useRoute<RegistryStackUseRouteProps>()

    return (
        <Screen>
            <Text>CADASTRO</Text>
            <CustomButton title="Info" onPress={ () => stackNavigation.navigate("Info") } />
            <CustomButton title="Login" onPress={ () => stackNavigation.navigate("Login") } />
            <CustomButton title="Tabs" onPress={ () => stackNavigation.navigate("Tabs") } />
        </Screen>
    )
}

const styles = StyleSheet.create({
})