import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { CustomImage } from "../../components/customs/CustomImage"
import { DreamsStackNavigationParams } from "../Tabs/Dreams"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { Screen } from "../../components/base/Screen"
import { StackNavigationParams, TabNavigationParams } from "../../../App"
import { StackNavigationProp } from "@react-navigation/stack"
import { StyleSheet } from "react-native"
import Auth from "../../components/auth/Auth"
import Box from "../../components/base/Box"
import CustomButton from "../../components/customs/CustomButton"
import FutureDevelopmentButton from "../../components/FutureDevelopmentButton"
import React from "react"

type DreamsHomeRouteProps = RouteProp<DreamsStackNavigationParams, "DreamsHome">
type DreamsHomeProps = {
    route: DreamsHomeRouteProps
}

type DreamsHomeDreamsStackUseNavigationProps = StackNavigationProp<DreamsStackNavigationParams, "DreamsHome">
type DreamsHomeStackNavigationProps = StackNavigationProp<StackNavigationParams, "Tabs">
type DreamsHomeTabNavigationProps = BottomTabNavigationProp<TabNavigationParams, "Dreams">

export const DreamsHome: React.FC<DreamsHomeProps> = ({ route }) => {
    const dreamsStackNavigation = useNavigation<DreamsHomeDreamsStackUseNavigationProps>()
    const stackNavigation = useNavigation<DreamsHomeStackNavigationProps>()
    const tabNavigation = useNavigation<DreamsHomeTabNavigationProps>()

    return (
        <Auth>
            <Screen>
                <Box.Center style={ styles.container }>
                    <CustomImage.Local
                        filePathByRequire={ require("../../assets/dreams_background.jpg") }
                        style={ styles.image }
                    />
                    <Box.Column style={ styles.btns }>
                        <CustomButton
                            title="Listagem de Sonhos"
                            onPress={ () => dreamsStackNavigation.navigate("DreamsList") }
                        />
                        <CustomButton
                            title="Criar Sonho"
                            onPress={ () => dreamsStackNavigation.navigate("CreateDream") }
                        />
                        <FutureDevelopmentButton btnTitle="Criar Sonho Rápido"/>
                        {/* <CustomButton
                            title="Criar Sonho Rápido"
                            onPress={ () => dreamsStackNavigation.navigate("CreateFastDream") }
                        /> */}
                        <FutureDevelopmentButton btnTitle="Importar Sonhos"/>
                        {/* <CustomButton
                            title="Importar Sonhos"
                            onPress={ () => dreamsStackNavigation.navigate("ImportDreams") }
                        /> */}
                        <FutureDevelopmentButton btnTitle="Exportar Sonhos"/>
                        {/* <CustomButton
                            title="Exportar Sonhos"
                            onPress={ () => dreamsStackNavigation.navigate("ExportDreams") }
                        /> */}
                    </Box.Column>
                </Box.Center>
            </Screen>
        </Auth>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        gap: 10.
    },
    image: {
        resizeMode: "cover",
        width: "100%",
        height: 150,
        borderRadius: 10,
    },
    btns: {
        gap: 15,
    },
})