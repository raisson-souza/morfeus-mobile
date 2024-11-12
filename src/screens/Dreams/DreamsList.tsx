import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { DateFormatter } from "../../utils/DateFormatter"
import { DreamListedByUserType, ListDreamsByUserRequest } from "../../types/dream"
import { DreamsStackNavigationParams } from "../Tabs/Dreams"
import { Picker } from "@react-native-picker/picker"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { Screen } from "../../components/base/Screen"
import { StackNavigationParams, TabNavigationParams } from "../../../App"
import { StackNavigationProp } from "@react-navigation/stack"
import { StyleSheet, Switch, Text, View } from "react-native"
import { SyncContextProvider } from "../../contexts/SyncContext"
import Auth from "../../components/auth/Auth"
import CustomButton from "../../components/customs/CustomButton"
import DatePicker from "../../components/customs/DatePicker"
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
    const [ date, setDate ] = useState<Date>(new Date())
    const [ listDreamsByUserForm, setListDreamsByUserForm ] = useState<ListDreamsByUserRequest>({
        dreamOriginFilter: "all",
        dreamCaracteristicsFilter: "allNotHiddenAndErotic",
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
        date: DateFormatter.forBackend.date(date.getTime())
    })

    useEffect(() => {
        const fetchDreams = async () => {
            await DreamService.ListByUser(isOnline, listDreamsByUserForm)
            .then(response => {
                if (response.Success) {
                    setDreamsList(response.Data)
                    return
                }
                alert(response.ErrorMessage)
            })
        }
        fetchDreams()
    }, [listDreamsByUserForm])

    return (
        <Auth>
            <Screen>
                <DatePicker date={ date } setDate={ setDate } buttonProps={{ title: "Selecione um mês", onPress: () => {} }} />
                <Picker
                    selectedValue={ listDreamsByUserForm.dreamCaracteristicsFilter }
                    onValueChange={ (e) => setListDreamsByUserForm({
                        ...listDreamsByUserForm,
                        dreamCaracteristicsFilter: e
                    })}
                    style={ styles.dreamCaracteristicsFilterPicker }
                >
                    <Picker.Item label="Todos os Sonhos" value="all" />
                    <Picker.Item label="Todos os Sonhos (menos os ocultos)" value="allNotHidden" />
                    <Picker.Item label="Todos os Sonhos (menos os eróticos)" value="allNotErotic" />
                    <Picker.Item label="Todos os Sonho (menos ocultos e eróticos)" value="allNotHiddenAndErotic" />
                    <Picker.Item label="Todos os Sonhos Ocultos" value="allHidden" />
                    <Picker.Item label="Todos os Sonhos Eróticos" value="allErotic" />
                </Picker>
                <Picker
                    selectedValue={ listDreamsByUserForm.dreamOriginFilter }
                    onValueChange={ (e) => setListDreamsByUserForm({
                        ...listDreamsByUserForm,
                        dreamOriginFilter: e
                    })}
                    style={ styles.dreamOriginFilterPicker }
                >
                    <Picker.Item label="Todas as Origens" value="all" />
                    <Picker.Item label="Sonhos Completos" value="completeDreams" />
                    <Picker.Item label="Sonhos Rápidos" value="fastDreams" />
                    <Picker.Item label="Sonhos Importados" value="importedDreams" />
                </Picker>
                <View>
                    <Text>Sem Especificidades</Text>
                    <Switch
                        value={ listDreamsByUserForm.dreamEspecificCaracteristicsFilter.noEspecificy }
                        onValueChange={ (e) => setListDreamsByUserForm({
                            ...listDreamsByUserForm,
                            dreamEspecificCaracteristicsFilter: {
                                ...listDreamsByUserForm.dreamEspecificCaracteristicsFilter,
                                noEspecificy: e,
                            }
                        })}
                    />
                </View>
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
                    title="Voltar"
                    onPress={ () => dreamsStackNavigation.goBack() }
                />
            </Screen>
        </Auth>
    )
}

const styles = StyleSheet.create({
    dreamCaracteristicsFilterPicker: {
        width: 395
    },
    dreamOriginFilterPicker: {
        width: 230
    },
})