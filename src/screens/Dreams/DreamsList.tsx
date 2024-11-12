import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { DateTimePickerAndroid, DateTimePickerEvent } from "@react-native-community/datetimepicker"
import { DreamListedByUserType } from "../../types/dream"
import { DreamsStackNavigationParams } from "../Tabs/Dreams"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { Screen } from "../../components/base/Screen"
import { StackNavigationParams, TabNavigationParams } from "../../../App"
import { StackNavigationProp } from "@react-navigation/stack"
import { StyleSheet, Text, View } from "react-native"
import { SyncContextProvider } from "../../contexts/SyncContext"
import Auth from "../../components/auth/Auth"
import CustomButton from "../../components/customs/CustomButton"
import DreamListedByUser from "../../components/dreams/DreamListedByUser"
import DreamService from "../../services/api/DreamService"
import Loading from "../../components/base/Loading"
import React, { useEffect, useState } from "react"

type DreamsListRouteProps = RouteProp<DreamsStackNavigationParams, "DreamsList">
type DreamsListProps = {
    route: DreamsListRouteProps
}

export type DreamsListDreamsStackUseNavigationProps = StackNavigationProp<DreamsStackNavigationParams, "DreamsList">
type DreamsListStackNavigationProps = StackNavigationProp<StackNavigationParams, "Tabs">
type DreamsListsTabNavigationProps = BottomTabNavigationProp<TabNavigationParams, "Dreams">

export const DreamsList: React.FC<DreamsListProps> = ({ route }) => {
    const dreamsStackNavigation = useNavigation<DreamsListDreamsStackUseNavigationProps>()
    const stackNavigation = useNavigation<DreamsListStackNavigationProps>()
    const tabNavigation = useNavigation<DreamsListsTabNavigationProps>()
    const [ dreamsList, setDreamsList ] = useState<DreamListedByUserType[] | null>(null)
    const { isConnectedRef: { current: isOnline }} = SyncContextProvider()

    useEffect(() => {
        const fetchDreams = async () => {
            await DreamService.ListByUser(isOnline, {
                dreamOriginFilter: "all",
                dreamCaracteristicsFilter: "all",
                dreamEspecificCaracteristicsFilter: {
                    noEspecificy: true,
                    dreamsWithPersonalAnalysis: null,
                    dreamClimates: {
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
                    dreamHourId: null,
                    dreamDurationId: null,
                    dreamLucidityLevelId: null,
                    dreamTypeId: null,
                    dreamRealityLevelId: null,
                    dreamPointOfViewId: null,
                },
                date: "2024/11/01"
            })
            .then(response => {
                if (response.Success) {
                    setDreamsList(response.Data)
                    return
                }
                alert(response.ErrorMessage)
            })
        }
        fetchDreams()
    }, [])

    const [ date, setDate ] = useState<Date>(new Date())

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate
        if (currentDate) setDate(currentDate)
    }

    const showMode = (currentMode: "date" | "time") => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        })
    }

    const showDatepicker = () => {
        showMode('date')
    }

    const showTimepicker = () => {
        showMode('time')
    }

    return (
        <Auth>
            <Screen>
                <Text>DREAMS LIST</Text>
                <CustomButton title="DATA" onPress={ showDatepicker } />
                <CustomButton title="TIME" onPress={ showTimepicker } />
                {
                    dreamsList
                        ? dreamsList.length > 0
                            ? (
                                <View>
                                    {
                                        dreamsList.map((dream, i) => (
                                            <DreamListedByUser dream={ dream } navigate={ dreamsStackNavigation } key={ i } />
                                        ))
                                    }
                                </View>
                            )
                            : <Text>Nenhum sonho encontrado.</Text>
                        : <Loading onlyLoading={ false } text="Buscando sonhos..." />
                }
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