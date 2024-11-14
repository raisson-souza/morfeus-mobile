import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { DreamModel } from "../../types/dream"
import { DreamsStackNavigationParams } from "../Tabs/Dreams"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { Screen } from "../../components/base/Screen"
import { StackNavigationParams, TabNavigationParams } from "../../../App"
import { StackNavigationProp } from "@react-navigation/stack"
import { SyncContextProvider } from "../../contexts/SyncContext"
import { TagModel } from "../../types/tag"
import Auth from "../../components/auth/Auth"
import CustomButton from "../../components/customs/CustomButton"
import DreamService from "../../services/api/DreamService"
import IconEntypo from "react-native-vector-icons/Entypo"
import IconFontisto from "react-native-vector-icons/Fontisto"
import IconFoundation from "react-native-vector-icons/Foundation"
import IconIon from "react-native-vector-icons/Ionicons"
import Loading from "../../components/base/Loading"
import React, { useEffect, useState } from "react"
import TagService from "../../services/api/TagService"

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
    const { isConnectedRef: { current: isOnline }} = SyncContextProvider()
    const [ dream, setDream ] = useState<DreamModel | null>(null)
    const [ tags, setTags ] = useState<TagModel[] | null>(null)
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ errorMessage, setErrorMessage ] = useState<string>("")
    // TODO: setar header c nome do sonho

    useEffect(() => {
        const fetchDream = async () => {
            await DreamService.GetDream(isOnline, { id: route.params.id })
                .then(response => {
                    if (response.Success) {
                        setDream(response.Data)
                        return
                    }
                    setErrorMessage(response.ErrorMessage ?? "")
                })
                .finally(() => {
                    setLoading(false)
                })
        }
        const fetchTags = async () => {
            await TagService.ListByDream(isOnline, { dreamId: route.params.id })
                .then(response => {
                    if (response.Success) {
                        setTags(response.Data)
                        return
                    }
                    setTags([])
                })
        }
        fetchDream()
        fetchTags()
    }, [])

    const editDream = <Pressable
        onPress={ () => dreamsStackNavigation.navigate("UpdateDream", { id: route.params.id, sleepDate: route.params.sleepDate }) }
    >
        <IconIon name="pencil-sharp" color="black" size={ 30 } />
    </Pressable>

    const renderDreamPointOfView = () => {
        switch (dream?.dreamPointOfViewId) {
            case 1: return "primeira"
            case 2: return "segunda"
            case 3: return "terceira"
            default: return "primeira"
        }
    }

    const renderDreamOrigin = () => {
        switch (dream?.dreamOriginId) {
            case 1: return "Sonho criado manualmente"
            case 2: return "Sonho rápido"
            case 3: return "Sonho importado"
            default: return "Sonho criado manualmente"
        }
    }

    const renderClimates = () => {
        let climates = ""
        if (dream?.climate.ameno) climates += "Ameno; "
        if (dream?.climate.calor) climates += "Calor; "
        if (dream?.climate.garoa) climates += "Garoa; "
        if (dream?.climate.chuva) climates += "Chuva; "
        if (dream?.climate.tempestade) climates += "Tempestade; "
        if (dream?.climate.nevoa) climates += "Nevoa; "
        if (dream?.climate.neve) climates += "Neve; "
        if (dream?.climate.multiplos) climates += "Múltiplos; "
        if (dream?.climate.outro) climates += "Outro; "
        if (dream?.climate.indefinido) climates += "Indefinido; "
        return climates
    }

    const renderHour = () => {
        let hour = "Horário: "
        switch (dream?.dreamHourId) {
            case 1: hour += "Amanhecer"; break
            case 2: hour += "Manhã / Tarde"; break
            case 3: hour += "Anoitecer"; break
            case 4: hour += "Noite"; break
            case 5: hour += "Indefinido"; break
            case 6: hour += "Múltiplos horários"; break
            default: hour += "Amanhecer"
        }
        return hour
    }

    const renderDuration = () => {
        let duration = "Duração: "
        switch (dream?.dreamDurationId) {
            case 1: duration += "Instantâneo"; break
            case 2: duration += "Curto"; break
            case 3: duration += "Médio"; break
            case 4: duration += "Longo"; break
            default: duration += "Instantâneo"
        }
        return duration
    }

    const renderLucidityLevel = () => {
        let lucidityLevel = "Nível de Lucidez: "
        switch (dream?.dreamLucidityLevelId) {
            case 1: lucidityLevel += "Não lúcido"; break
            case 2: lucidityLevel += "Parcialmente lúcido"; break
            case 3: lucidityLevel += "Lúcido"; break
            case 4: lucidityLevel += "Indefinido"; break
            default: lucidityLevel += "Não lúcido"
        }
        return lucidityLevel
    }

    const renderRealityLevel = () => {
        let realityLevel = "Nível de Realidade: "
        switch (dream?.dreamRealityLevelId) {
            case 1: realityLevel += "Irreal"; break
            case 2: realityLevel += "Parcialmente real"; break
            case 3: realityLevel += "Real"; break
            default: realityLevel += "Irreal"
        }
        return realityLevel
    }

    return (
        <Auth>
            <Screen>
                {
                    loading
                        ? <Loading onlyLoading={ false } text="Buscando Sonho..." />
                        : dream
                            ? (
                                <View style={ styles.container }>
                                    {
                                        dream.hiddenDream
                                            ? <View>
                                                <IconIon name="alert-circle-sharp" color="black" size={ 20 } />
                                                <Text>Esse sonho é oculto</Text>
                                            </View>
                                            : <></>
                                    }
                                    {
                                        dream.dreamTypeId === 2
                                            ? <Text>Pesadelo</Text>
                                            : <></>
                                    }
                                    <View>
                                        <View style={ styles.dreamTitle }>
                                            {
                                                dream.eroticDream
                                                    ? <View style={ styles.iconAndMessageStyle }>
                                                        <IconIon name="alert-circle-sharp" color="black" size={ 20 } />
                                                        <Text>Sonho erótico</Text>
                                                    </View>
                                                    : <></>
                                            }
                                            <View style={ styles.dreamTitleTextContainer }>
                                                <Text style={ styles.dreamTitleText }>{ dream.title }</Text>
                                                { editDream }
                                            </View>
                                        </View>
                                        <Text style={ styles.dreamTitleDateText }>{ route.params.sleepDate }</Text>
                                    </View>
                                    <Text style={ styles.dreamDescription }>{ dream.description }</Text>
                                    <View style={ styles.tagsContainer }>
                                        <Text style={ styles.tagContainerTitle }>TAGS</Text>
                                        <View style={ styles.tags }>
                                            {
                                                tags
                                                    ? tags.length > 0
                                                        ? tags.map((tag, i) => (
                                                            <Pressable
                                                                onPress={ () => dreamsStackNavigation.navigate("GetTag", { title: tag.title, id: tag.id }) }
                                                                key={ i }
                                                            >
                                                                <Text style={ styles.tagText }>{ tag.title }</Text>
                                                            </Pressable>
                                                        ))
                                                        : <Text>Não há tags</Text>
                                                    : <Loading onlyLoading={ false } text="Buscando Tags...." />
                                            }
                                        </View>
                                    </View>
                                    <View>
                                        {
                                            dream.personalAnalysis
                                                ? <View style={ styles.personalAnalysisContainer }>
                                                    <View style={ styles.iconAndMessageStyle }>
                                                        <IconIon name="person-outline" color="black" size={ 20 } />
                                                        <Text style={ styles.personalAnalysisText }>Análise pessoal:</Text>
                                                    </View>
                                                    <Text style={ styles.personalAnalysisText }>{ dream.personalAnalysis }</Text>
                                                </View>
                                                : <></>
                                        }
                                        <View style={ styles.iconAndMessageStyle }>
                                            <IconIon name="rainy-sharp" color="black" size={ 20 } />
                                            <Text>Climas: { renderClimates() }</Text>
                                        </View>
                                        <View style={ styles.iconAndMessageStyle }>
                                            <IconIon name="game-controller" color="black" size={ 20 } />
                                            <Text>Sonho em { renderDreamPointOfView() } pessoa</Text>
                                        </View>
                                        <View style={ styles.iconAndMessageStyle }>
                                            <IconFontisto name="clock" color="black" size={ 20 } />
                                            <Text>{ renderHour() }</Text>
                                        </View>
                                        <View style={ styles.iconAndMessageStyle }>
                                            <IconIon name="timer" color="black" size={ 20 } />
                                            <Text>{ renderDuration() }</Text>
                                        </View>
                                        <View style={ styles.iconAndMessageStyle }>
                                            <IconEntypo name="drink" color="black" size={ 20 } />
                                            <Text>{ renderLucidityLevel() }</Text>
                                        </View>
                                        <View style={ styles.iconAndMessageStyle }>
                                            <IconFoundation name="magnifying-glass" color="black" size={ 20 } />
                                            <Text>{ renderRealityLevel() }</Text>
                                        </View>
                                        <View style={ styles.iconAndMessageStyle }>
                                            <IconIon name="information-circle" color="black" size={ 20 } />
                                            <Text>{ renderDreamOrigin() }</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                            : <>
                                <Text>Houve um problema ao buscar o sonho:</Text>
                                <Text>{ errorMessage }</Text>
                            </>
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
    container: {
        width: "100%",
        padding: 10,
        display: "flex",
        flexDirection: "column",
        gap: 5,
    },
    dreamTitle: {
        display: "flex",
        flexDirection: "column",
    },
    iconAndMessageStyle: {
        display: "flex",
        flexDirection: "row",
        gap: 3,
    },
    dreamTitleText: {
        fontSize: 35
    },
    dreamTitleTextContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 15,
    },
    dreamTitleDateText: {
        fontSize: 18
    },
    dreamDescription: {
        fontSize: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    tagsContainer: {
        display: "flex",
        flexDirection: "column",
        paddingTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 20,
        borderRadius: 15,
        backgroundColor: "royalblue"
    },
    tags: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    tagContainerTitle: {
        fontWeight: "bold",
        fontSize: 25,
        color: "white",
        paddingBottom: 10,
    },
    tagText: {
        fontSize: 22,
        color: "white"
    },
    personalAnalysisContainer: {
        paddingVertical: 10,
    },
    personalAnalysisText: {
        fontSize: 20
    }
})