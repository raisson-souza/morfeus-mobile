import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { CompleteDreamModel } from "../../types/dream"
import { DateFormatter } from "../../utils/DateFormatter"
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker"
import { DreamsStackNavigationParams } from "../Tabs/Dreams"
import { Pressable, StyleSheet, Text } from "react-native"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { Screen } from "../../components/base/Screen"
import { StackNavigationParams, TabNavigationParams } from "../../../App"
import { StackNavigationProp } from "@react-navigation/stack"
import { SyncContextProvider } from "../../contexts/SyncContext"
import Auth from "../../components/auth/Auth"
import Box from "../../components/base/Box"
import CreateCompleteDream from "./components/CreateCompleteDream"
import CustomButton from "../../components/customs/CustomButton"
import DreamService from "../../services/api/DreamService"
import Loading from "../../components/base/Loading"
import React, { useState } from "react"

type CreateDreamRouteProps = RouteProp<DreamsStackNavigationParams, "CreateDream">
type CreateDreamProps = {
    route: CreateDreamRouteProps
}

type CreateDreamDreamsStackUseNavigationProps = StackNavigationProp<DreamsStackNavigationParams, "CreateDream">
type CreateDreamStackNavigationProps = StackNavigationProp<StackNavigationParams, "Tabs">
type CreateDreamTabNavigationProps = BottomTabNavigationProp<TabNavigationParams, "Dreams">

export const CreateDream: React.FC<CreateDreamProps> = ({ route }) => {
    const dreamsStackNavigation = useNavigation<CreateDreamDreamsStackUseNavigationProps>()
    const stackNavigation = useNavigation<CreateDreamStackNavigationProps>()
    const tabNavigation = useNavigation<CreateDreamTabNavigationProps>()
    const { isConnectedRef: { current: isOnline }} = SyncContextProvider()
    const [ dream, setDream ] = useState<CompleteDreamModel>({
        title: "",
        description: "",
        dreamPointOfViewId: 1,
        climate: {
            ameno: false,
            calor: false,
            garoa: false,
            chuva: false,
            tempestade: false,
            nevoa: false,
            neve: false,
            multiplos: false,
            outro: false,
            indefinido: false,
        },
        dreamHourId: 2,
        dreamDurationId: 2,
        dreamLucidityLevelId: 1,
        dreamTypeId: 1,
        dreamRealityLevelId: 1,
        eroticDream: false,
        hiddenDream: false,
        personalAnalysis: null,
        tags: [],
    })
    const [ date, setDate ] = useState<Date>(new Date())
    const [ loading, setLoading ] = useState<boolean>(false)

    // TODO: validação com ZOD

    const createDream = async () => {
        setLoading(true)
        await DreamService.Create(isOnline, {
            ...dream,
            date: DateFormatter.forBackend.date(date.getTime())
        })
        .then(response => {
            if (response.Success) {
                alert(response.Data)
                dreamsStackNavigation.navigate("DreamsList")
                return
            }
            setLoading(false)
            alert(response.ErrorMessage)
        })
    }

    return (
        <Auth>
            <Screen>
                <Box.Column style={ styles.container }>
                    <Pressable
                        onPress={ () =>
                            DateTimePickerAndroid.open({
                                value: date,
                                onChange: (_, date) => {
                                    if (date) setDate(date)
                                },
                                mode: "date",
                            })
                        }
                        style={ styles.dreamDateContainer }
                    >
                        <Box.Column style={ styles.dreamDate }>
                            <Text style={ styles.dreamDateText }>{ DateFormatter.removeTime(date.toISOString()) }</Text>
                            <Text style={ styles.dreamDateTextDescription }>DATA DO SONHO</Text>
                        </Box.Column>
                    </Pressable>
                    <CreateCompleteDream
                        dream={ dream }
                        setDream={ setDream }
                    />
                    <CustomButton
                        title="Criar Sonho"
                        onPress={ () => createDream() }
                    />
                    {
                        loading
                            ? <Loading onlyLoading={ false } text="Criando Sonho..." />
                            : <CustomButton
                                title="Voltar"
                                onPress={ () => dreamsStackNavigation.goBack() }
                            />
                    }
                </Box.Column>
            </Screen>
        </Auth>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 10,
    },
    dreamDateContainer: {
        alignSelf: "center",
        backgroundColor: "royalblue",
        padding: 15,
        borderRadius: 30,
    },
    dreamDate: {
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
    },
    dreamDateText: {
        fontSize: 30,
        color: "white"
    },
    dreamDateTextDescription: {
        fontSize: 18,
        color: "white"
    },
})