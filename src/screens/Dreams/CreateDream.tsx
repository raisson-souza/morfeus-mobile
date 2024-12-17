import { DreamsStackNavigationParams } from "../Tabs/Dreams"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { Screen } from "../../components/base/Screen"
import { StackNavigationProp } from "@react-navigation/stack"
import { StyleSheet } from "react-native"
import { SyncContextProvider } from "../../contexts/SyncContext"
import Auth from "../../components/auth/Auth"
import Box from "../../components/base/Box"
import CreateDreamContextComponent from "./CreateDreamContext"
import React from "react"
import TextBold from "../../components/base/TextBold"

type CreateDreamRouteProps = RouteProp<DreamsStackNavigationParams, "CreateDream">
type CreateDreamProps = {
    route: CreateDreamRouteProps
}

type CreateDreamDreamsStackUseNavigationProps = StackNavigationProp<DreamsStackNavigationParams, "CreateDream">

export const CreateDream: React.FC<CreateDreamProps> = ({ route }) => {
    const dreamsStackNavigation = useNavigation<CreateDreamDreamsStackUseNavigationProps>()
    const { isConnectedRef: { current: isOnline }} = SyncContextProvider()

    return (
        <Auth>
            <Screen>
                <Box.Column style={ styles.container }>
                    <TextBold style={ styles.dreamDateText }>Defina a data de seu sonho</TextBold>
                    <CreateDreamContextComponent
                        dreamsStackNavigation={ dreamsStackNavigation }
                        isOnline={ isOnline }
                    />
                </Box.Column>
            </Screen>
        </Auth>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        gap: 10,
    },
    dreamDateText: {
        fontSize: 18,
    },
})