import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { DreamModel } from "../../types/dream"
import { DreamsStackNavigationParams } from "../Tabs/Dreams"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { Screen } from "../../components/base/Screen"
import { StackNavigationParams, TabNavigationParams } from "../../../App"
import { StackNavigationProp } from "@react-navigation/stack"
import { SyncContextProvider } from "../../contexts/SyncContext"
import { useEffect, useState } from "react"
import { View, Text } from "react-native"
import CustomButton from "../../components/customs/CustomButton"
import DreamListedByUser from "./components/DreamListedByUser"
import Loading from "../../components/base/Loading"
import TagService from "../../services/api/TagService"

type GetTagRouteProps = RouteProp<DreamsStackNavigationParams, "GetTag">
type GetTagProps = {
    route: GetTagRouteProps
}

type GetDreamDreamsStackUseNavigationProps = StackNavigationProp<DreamsStackNavigationParams, "GetTag">
type GetDreamStackNavigationProps = StackNavigationProp<StackNavigationParams, "Tabs">
type GetDreamsTabNavigationProps = BottomTabNavigationProp<TabNavigationParams, "Dreams">

export const GetTag: React.FC<GetTagProps> = ({ route }) => {
    const dreamsStackNavigation = useNavigation<GetDreamDreamsStackUseNavigationProps>()
    const stackNavigation = useNavigation<GetDreamStackNavigationProps>()
    const tabNavigation = useNavigation<GetDreamsTabNavigationProps>()
    const { isConnectedRef: { current: isOnline }} = SyncContextProvider()
    const [ dreams, setDreams ] = useState<DreamModel[] | null>(null)
    const [ errorMessage, setErrorMessage ] = useState<string | null>(null)

    useEffect(() => {
        const fetchTag = async () => {
            await TagService.ListDreamsByTag(isOnline, { tagId: route.params.id })
                .then(response => {
                    if (response.Success) {
                        setDreams(response.Data)
                        return
                    }
                    setErrorMessage(response.ErrorMessage ?? "")
                })
        }
        fetchTag()
    }, [])

    return (
        <Screen>
            <Text>Tag { route.params.title }</Text>
            {
                dreams
                    ? dreams.length > 0
                        ? <View>
                            <Text>Sonhos:</Text>
                            <View>
                                {
                                    dreams.map((dream, i) => {
                                        return <DreamListedByUser
                                            dream={{
                                                id: dream.id,
                                                title: dream.title,
                                                date: "",
                                                tags: []
                                            }}
                                            navigate={ dreamsStackNavigation }
                                            showDate={ false }
                                            key={ i }
                                        />
                                    })
                                }
                            </View>
                        </View>
                        : <Text>Nenhum sono encontrado.</Text>
                    : errorMessage
                        ? <View>
                            <Text>Houve um erro ao buscar os sonhos da tag { route.params.title }:</Text>
                            <Text>{ errorMessage }</Text>
                        </View>
                        : <Loading onlyLoading={ false } text="Buscando Sonhos..." />
            }
            <CustomButton
                title="Voltar"
                onPress={ () => dreamsStackNavigation.goBack() }
            />
        </Screen>
    )
}