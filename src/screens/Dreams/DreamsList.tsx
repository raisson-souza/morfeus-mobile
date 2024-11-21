import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { DateFormatter } from "../../utils/DateFormatter"
import { DreamListedByUserType, ListDreamsByUserRequest } from "../../types/dream"
import { DreamsStackNavigationParams } from "../Tabs/Dreams"
import { Picker } from "@react-native-picker/picker"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { Screen } from "../../components/base/Screen"
import { StackNavigationParams, TabNavigationParams } from "../../../App"
import { StackNavigationProp } from "@react-navigation/stack"
import { StyleSheet, Switch, Text } from "react-native"
import { SyncContextProvider } from "../../contexts/SyncContext"
import Auth from "../../components/auth/Auth"
import Box from "../../components/base/Box"
import CustomButton from "../../components/customs/CustomButton"
import DatePicker from "../../components/customs/DatePicker"
import DreamListedByUser from "./components/DreamListedByUser"
import DreamService from "../../services/api/DreamService"
import Loading from "../../components/base/Loading"
import MonthParser from "../../utils/MonthParser"
import React, { useEffect, useState } from "react"
import SwitchNull from "../../components/NullSwitch"

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
                ameno: null,
                calor: null,
                garoa: null,
                chuva: null,
                tempestade: null,
                nevoa: null,
                neve: null,
                multiplos: null,
                outro: null,
                indefinido: null,
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
    const [ dreamsWithPersonalAnalysisNullSwitch, setDreamsWithPersonalAnalysisNullSwitch ] = useState<boolean>(listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamsWithPersonalAnalysis ?? true)
    const [ dreamClimatesAmenoNullSwitch, setDreamClimatesAmenoNullSwitch ] = useState<boolean>(listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamClimates.ameno ?? true)
    const [ dreamClimatesCalorNullSwitch, setDreamClimatesCalorNullSwitch ] = useState<boolean>(listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamClimates.calor ?? true)
    const [ dreamClimatesGaroaNullSwitch, setDreamClimatesGaroaNullSwitch ] = useState<boolean>(listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamClimates.garoa ?? true)
    const [ dreamClimatesChuvaNullSwitch, setDreamClimatesChuvaNullSwitch ] = useState<boolean>(listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamClimates.chuva ?? true)
    const [ dreamClimatesTempestadeNullSwitch, setDreamClimatesTempestadeNullSwitch ] = useState<boolean>(listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamClimates.tempestade ?? true)
    const [ dreamClimatesNevoaNullSwitch, setDreamClimatesNevoaNullSwitch ] = useState<boolean>(listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamClimates.nevoa ?? true)
    const [ dreamClimatesNeveNullSwitch, setDreamClimatesNeveNullSwitch ] = useState<boolean>(listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamClimates.neve ?? true)
    const [ dreamClimatesMultiplosNullSwitch, setDreamClimatesMultiplosNullSwitch ] = useState<boolean>(listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamClimates.multiplos ?? true)
    const [ dreamClimatesOutroNullSwitch, setDreamClimatesOutroNullSwitch ] = useState<boolean>(listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamClimates.outro ?? true)
    const [ dreamClimatesIndefinidoNullSwitch, setDreamClimatesIndefinidoNullSwitch ] = useState<boolean>(listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamClimates.indefinido ?? true)

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
    }, [listDreamsByUserForm, date])

    const dreamsListMonthNumber = DateFormatter
        .removeTime(date.toISOString())
        .split("-")[1]

    return (
        <Auth>
            <Screen>
                <Box.Center>
                    <Text>{ MonthParser(Number.parseInt(dreamsListMonthNumber)) }</Text>
                    <DatePicker
                        date={ date }
                        onChange={ (e) => setDate(e) }
                        buttonProps={{
                            title: "Selecione um mês",
                            onPress: () => {}
                        }}
                    />
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
                        <Picker.Item label="Todos os Sonhos (menos ocultos e eróticos)" value="allNotHiddenAndErotic" />
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
                    <Box.Column>
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
                    </Box.Column>
                    {/* FILTROS ESPECÍFICOS */}
                    {
                        listDreamsByUserForm.dreamEspecificCaracteristicsFilter.noEspecificy
                            ? <></>
                            : (
                                <Box.Column>
                                    <SwitchNull
                                        label="Sonhos com Análise Pessoal"
                                        btnTitle={ dreamsWithPersonalAnalysisNullSwitch ? "Habilitar" : "Desabilitar" }
                                        isSwitchNull={ dreamsWithPersonalAnalysisNullSwitch }
                                        setSwitchNull={ setDreamsWithPersonalAnalysisNullSwitch }
                                        switchValue={ listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamsWithPersonalAnalysis }
                                        setSwitchValue={ (e) => setListDreamsByUserForm({
                                            ...listDreamsByUserForm,
                                            dreamEspecificCaracteristicsFilter: {
                                                ...listDreamsByUserForm.dreamEspecificCaracteristicsFilter,
                                                dreamsWithPersonalAnalysis: e,
                                            }
                                        })}
                                    />
                                    {/* CLIMAS */}
                                    <Box.Column>
                                        {/** // TODO: VALIDAR O USO DO SwitchNull */}
                                        <Box.Column>
                                            <Text>Clima Amenos</Text>
                                            <CustomButton
                                                title={ dreamClimatesAmenoNullSwitch ? "Habilitar" : "Desabilitar" }
                                                onPress={ () => setDreamClimatesAmenoNullSwitch(!dreamClimatesAmenoNullSwitch) }
                                            />
                                            {
                                                dreamClimatesAmenoNullSwitch
                                                    ? <></>
                                                    : (
                                                        <Switch
                                                            value={ listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamClimates.ameno! }
                                                            onValueChange={ (e) => setListDreamsByUserForm({
                                                                ...listDreamsByUserForm,
                                                                dreamEspecificCaracteristicsFilter: {
                                                                    ...listDreamsByUserForm.dreamEspecificCaracteristicsFilter,
                                                                    dreamClimates: {
                                                                        ...listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamClimates,
                                                                        ameno: e
                                                                    },
                                                                }
                                                            })}
                                                        />
                                                    )
                                            }
                                        </Box.Column>
                                        <Box.Column>
                                            <Text>Clima Calor</Text>
                                            <CustomButton
                                                title={ dreamClimatesCalorNullSwitch ? "Habilitar" : "Desabilitar" }
                                                onPress={ () => setDreamClimatesCalorNullSwitch(!dreamClimatesCalorNullSwitch) }
                                            />
                                            {
                                                dreamClimatesCalorNullSwitch
                                                    ? <></>
                                                    : (
                                                        <Switch
                                                            value={ listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamClimates.calor! }
                                                            onValueChange={ (e) => setListDreamsByUserForm({
                                                                ...listDreamsByUserForm,
                                                                dreamEspecificCaracteristicsFilter: {
                                                                    ...listDreamsByUserForm.dreamEspecificCaracteristicsFilter,
                                                                    dreamClimates: {
                                                                        ...listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamClimates,
                                                                        calor: e
                                                                    },
                                                                }
                                                            })}
                                                        />
                                                    )
                                            }
                                        </Box.Column>
                                        <Box.Column>
                                            <Text>Clima Garoa</Text>
                                            <CustomButton
                                                title={ dreamClimatesGaroaNullSwitch ? "Habilitar" : "Desabilitar" }
                                                onPress={ () => setDreamClimatesGaroaNullSwitch(!dreamClimatesGaroaNullSwitch) }
                                            />
                                            {
                                                dreamClimatesGaroaNullSwitch
                                                    ? <></>
                                                    : (
                                                        <Switch
                                                            value={ listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamClimates.garoa! }
                                                            onValueChange={ (e) => setListDreamsByUserForm({
                                                                ...listDreamsByUserForm,
                                                                dreamEspecificCaracteristicsFilter: {
                                                                    ...listDreamsByUserForm.dreamEspecificCaracteristicsFilter,
                                                                    dreamClimates: {
                                                                        ...listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamClimates,
                                                                        garoa: e
                                                                    },
                                                                }
                                                            })}
                                                        />
                                                    )
                                            }
                                        </Box.Column>
                                        <Box.Column>
                                            <Text>Clima Chuva</Text>
                                            <CustomButton
                                                title={ dreamClimatesChuvaNullSwitch ? "Habilitar" : "Desabilitar" }
                                                onPress={ () => setDreamClimatesChuvaNullSwitch(!dreamClimatesChuvaNullSwitch) }
                                            />
                                            {
                                                dreamClimatesChuvaNullSwitch
                                                    ? <></>
                                                    : (
                                                        <Switch
                                                            value={ listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamClimates.chuva! }
                                                            onValueChange={ (e) => setListDreamsByUserForm({
                                                                ...listDreamsByUserForm,
                                                                dreamEspecificCaracteristicsFilter: {
                                                                    ...listDreamsByUserForm.dreamEspecificCaracteristicsFilter,
                                                                    dreamClimates: {
                                                                        ...listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamClimates,
                                                                        chuva: e
                                                                    },
                                                                }
                                                            })}
                                                        />
                                                    )
                                            }
                                        </Box.Column>
                                        <Box.Column>
                                            <Text>Clima Tempestade</Text>
                                            <CustomButton
                                                title={ dreamClimatesTempestadeNullSwitch ? "Habilitar" : "Desabilitar" }
                                                onPress={ () => setDreamClimatesTempestadeNullSwitch(!dreamClimatesTempestadeNullSwitch) }
                                            />
                                            {
                                                dreamClimatesTempestadeNullSwitch
                                                    ? <></>
                                                    : (
                                                        <Switch
                                                            value={ listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamClimates.tempestade! }
                                                            onValueChange={ (e) => setListDreamsByUserForm({
                                                                ...listDreamsByUserForm,
                                                                dreamEspecificCaracteristicsFilter: {
                                                                    ...listDreamsByUserForm.dreamEspecificCaracteristicsFilter,
                                                                    dreamClimates: {
                                                                        ...listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamClimates,
                                                                        tempestade: e
                                                                    },
                                                                }
                                                            })}
                                                        />
                                                    )
                                            }
                                        </Box.Column>
                                        <Box.Column>
                                            <Text>Clima Nevoa</Text>
                                            <CustomButton
                                                title={ dreamClimatesNevoaNullSwitch ? "Habilitar" : "Desabilitar" }
                                                onPress={ () => setDreamClimatesNevoaNullSwitch(!dreamClimatesNevoaNullSwitch) }
                                            />
                                            {
                                                dreamClimatesNevoaNullSwitch
                                                    ? <></>
                                                    : (
                                                        <Switch
                                                            value={ listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamClimates.nevoa! }
                                                            onValueChange={ (e) => setListDreamsByUserForm({
                                                                ...listDreamsByUserForm,
                                                                dreamEspecificCaracteristicsFilter: {
                                                                    ...listDreamsByUserForm.dreamEspecificCaracteristicsFilter,
                                                                    dreamClimates: {
                                                                        ...listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamClimates,
                                                                        nevoa: e
                                                                    },
                                                                }
                                                            })}
                                                        />
                                                    )
                                            }
                                        </Box.Column>
                                        <Box.Column>
                                            <Text>Clima Neve</Text>
                                            <CustomButton
                                                title={ dreamClimatesNeveNullSwitch ? "Habilitar" : "Desabilitar" }
                                                onPress={ () => setDreamClimatesNeveNullSwitch(!dreamClimatesNeveNullSwitch) }
                                            />
                                            {
                                                dreamClimatesNeveNullSwitch
                                                    ? <></>
                                                    : (
                                                        <Switch
                                                            value={ listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamClimates.neve! }
                                                            onValueChange={ (e) => setListDreamsByUserForm({
                                                                ...listDreamsByUserForm,
                                                                dreamEspecificCaracteristicsFilter: {
                                                                    ...listDreamsByUserForm.dreamEspecificCaracteristicsFilter,
                                                                    dreamClimates: {
                                                                        ...listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamClimates,
                                                                        neve: e
                                                                    },
                                                                }
                                                            })}
                                                        />
                                                    )
                                            }
                                        </Box.Column>
                                        <Box.Column>
                                            <Text>Múltiplos Climas</Text>
                                            <CustomButton
                                                title={ dreamClimatesMultiplosNullSwitch ? "Habilitar" : "Desabilitar" }
                                                onPress={ () => setDreamClimatesMultiplosNullSwitch(!dreamClimatesMultiplosNullSwitch) }
                                            />
                                            {
                                                dreamClimatesMultiplosNullSwitch
                                                    ? <></>
                                                    : (
                                                        <Switch
                                                            value={ listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamClimates.multiplos! }
                                                            onValueChange={ (e) => setListDreamsByUserForm({
                                                                ...listDreamsByUserForm,
                                                                dreamEspecificCaracteristicsFilter: {
                                                                    ...listDreamsByUserForm.dreamEspecificCaracteristicsFilter,
                                                                    dreamClimates: {
                                                                        ...listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamClimates,
                                                                        multiplos: e
                                                                    },
                                                                }
                                                            })}
                                                        />
                                                    )
                                            }
                                        </Box.Column>
                                        <Box.Column>
                                            <Text>Outro Clima</Text>
                                            <CustomButton
                                                title={ dreamClimatesOutroNullSwitch ? "Habilitar" : "Desabilitar" }
                                                onPress={ () => setDreamClimatesOutroNullSwitch(!dreamClimatesOutroNullSwitch) }
                                            />
                                            {
                                                dreamClimatesOutroNullSwitch
                                                    ? <></>
                                                    : (
                                                        <Switch
                                                            value={ listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamClimates.outro! }
                                                            onValueChange={ (e) => setListDreamsByUserForm({
                                                                ...listDreamsByUserForm,
                                                                dreamEspecificCaracteristicsFilter: {
                                                                    ...listDreamsByUserForm.dreamEspecificCaracteristicsFilter,
                                                                    dreamClimates: {
                                                                        ...listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamClimates,
                                                                        outro: e
                                                                    },
                                                                }
                                                            })}
                                                        />
                                                    )
                                            }
                                        </Box.Column>
                                        <Box.Column>
                                            <Text>Clima Indefinido</Text>
                                            <CustomButton
                                                title={ dreamClimatesIndefinidoNullSwitch ? "Habilitar" : "Desabilitar" }
                                                onPress={ () => setDreamClimatesIndefinidoNullSwitch(!dreamClimatesIndefinidoNullSwitch) }
                                            />
                                            {
                                                dreamClimatesIndefinidoNullSwitch
                                                    ? <></>
                                                    : (
                                                        <Switch
                                                            value={ listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamClimates.indefinido! }
                                                            onValueChange={ (e) => setListDreamsByUserForm({
                                                                ...listDreamsByUserForm,
                                                                dreamEspecificCaracteristicsFilter: {
                                                                    ...listDreamsByUserForm.dreamEspecificCaracteristicsFilter,
                                                                    dreamClimates: {
                                                                        ...listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamClimates,
                                                                        indefinido: e
                                                                    },
                                                                }
                                                            })}
                                                        />
                                                    )
                                            }
                                        </Box.Column>
                                    </Box.Column>
                                    {/* CLIMAS FIM */}
                                    {/* PICKERS */}
                                    <Picker
                                        selectedValue={ listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamHourId }
                                        onValueChange={ (e) => setListDreamsByUserForm({
                                            ...listDreamsByUserForm,
                                            dreamEspecificCaracteristicsFilter: {
                                                ...listDreamsByUserForm.dreamEspecificCaracteristicsFilter,
                                                dreamHourId: e
                                            }
                                        })}
                                        style={ styles.dreamOriginFilterPicker }
                                    >
                                        <Picker.Item label="Horário do Sonho..." value={ null } />
                                        <Picker.Item label="Amanhecer" value="1" />
                                        <Picker.Item label="Dia" value="2" />
                                        <Picker.Item label="Anoitecer" value="3" />
                                        <Picker.Item label="Noite" value="4" />
                                        <Picker.Item label="Indefinido" value="5" />
                                        <Picker.Item label="Múltiplos" value="6" />
                                    </Picker>
                                    <Picker
                                        selectedValue={ listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamDurationId }
                                        onValueChange={ (e) => setListDreamsByUserForm({
                                            ...listDreamsByUserForm,
                                            dreamEspecificCaracteristicsFilter: {
                                                ...listDreamsByUserForm.dreamEspecificCaracteristicsFilter,
                                                dreamDurationId: e
                                            }
                                        })}
                                        style={ styles.dreamOriginFilterPicker }
                                    >
                                        <Picker.Item label="Duração do Sonho..." value={ null } />
                                        <Picker.Item label="Instantâneo" value="1" />
                                        <Picker.Item label="Curto" value="2" />
                                        <Picker.Item label="Médio" value="3" />
                                        <Picker.Item label="Longo" value="4" />
                                    </Picker>
                                    <Picker
                                        selectedValue={ listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamLucidityLevelId }
                                        onValueChange={ (e) => setListDreamsByUserForm({
                                            ...listDreamsByUserForm,
                                            dreamEspecificCaracteristicsFilter: {
                                                ...listDreamsByUserForm.dreamEspecificCaracteristicsFilter,
                                                dreamLucidityLevelId: e
                                            }
                                        })}
                                        style={ styles.dreamOriginFilterPicker }
                                    >
                                        <Picker.Item label="Nível de Lucidez do Sonho..." value={ null } />
                                        <Picker.Item label="Não Lúcido" value="1" />
                                        <Picker.Item label="Parcialmente Lúcido" value="2" />
                                        <Picker.Item label="Lúcido" value="3" />
                                        <Picker.Item label="Indefinido" value="4" />
                                    </Picker>
                                    <Picker
                                        selectedValue={ listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamTypeId }
                                        onValueChange={ (e) => setListDreamsByUserForm({
                                            ...listDreamsByUserForm,
                                            dreamEspecificCaracteristicsFilter: {
                                                ...listDreamsByUserForm.dreamEspecificCaracteristicsFilter,
                                                dreamTypeId: e
                                            }
                                        })}
                                        style={ styles.dreamOriginFilterPicker }
                                    >
                                        <Picker.Item label="Tipo de Sonho..." value={ null } />
                                        <Picker.Item label="Sonho" value="1" />
                                        <Picker.Item label="Pesadelo" value="2" />
                                        <Picker.Item label="Indefinido" value="3" />
                                    </Picker>
                                    <Picker
                                        selectedValue={ listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamRealityLevelId }
                                        onValueChange={ (e) => setListDreamsByUserForm({
                                            ...listDreamsByUserForm,
                                            dreamEspecificCaracteristicsFilter: {
                                                ...listDreamsByUserForm.dreamEspecificCaracteristicsFilter,
                                                dreamRealityLevelId: e
                                            }
                                        })}
                                        style={ styles.dreamOriginFilterPicker }
                                    >
                                        <Picker.Item label="Nível de Realidade so Sonho..." value={ null } />
                                        <Picker.Item label="Irreal" value="1" />
                                        <Picker.Item label="Parcialmente Real" value="2" />
                                        <Picker.Item label="Real" value="3" />
                                    </Picker>
                                    <Picker
                                        selectedValue={ listDreamsByUserForm.dreamEspecificCaracteristicsFilter.dreamPointOfViewId }
                                        onValueChange={ (e) => setListDreamsByUserForm({
                                            ...listDreamsByUserForm,
                                            dreamEspecificCaracteristicsFilter: {
                                                ...listDreamsByUserForm.dreamEspecificCaracteristicsFilter,
                                                dreamPointOfViewId: e
                                            }
                                        })}
                                        style={ styles.dreamOriginFilterPicker }
                                    >
                                        <Picker.Item label="Perspectiva..." value={ null } />
                                        <Picker.Item label="Primeira Pessoa" value="1" />
                                        <Picker.Item label="Segunda Pessoa" value="2" />
                                        <Picker.Item label="Terceira Pessoa" value="3" />
                                    </Picker>
                                    {/* PICKER FIM */}
                                </Box.Column>
                            )
                    }
                    {/* FILTROS ESPECÍFICOS FIM */}
                    {
                        dreamsList
                            ? dreamsList.length > 0
                                ? (
                                    <Box.Column>
                                        {
                                            dreamsList.map((dream, i) => (
                                                <DreamListedByUser dream={ dream } navigate={ dreamsStackNavigation } key={ i } />
                                            ))
                                        }
                                    </Box.Column>
                                )
                                : <Text>Nenhum sonho encontrado.</Text>
                            : <Loading onlyLoading={ false } text="Buscando sonhos..." />
                    }
                    <CustomButton
                        title="Voltar"
                        onPress={ () => dreamsStackNavigation.goBack() }
                    />
                </Box.Center>
            </Screen>
        </Auth>
    )
}

const styles = StyleSheet.create({
    dreamCaracteristicsFilterPicker: {
        width: 405
    },
    dreamOriginFilterPicker: {
        width: 225
    },
})