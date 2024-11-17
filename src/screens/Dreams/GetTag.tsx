import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { DreamModel } from "../../types/dream"
import { DreamsStackNavigationParams } from "../Tabs/Dreams"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { Screen } from "../../components/base/Screen"
import { StackNavigationParams, TabNavigationParams } from "../../../App"
import { StackNavigationProp } from "@react-navigation/stack"
import { SyncContextProvider } from "../../contexts/SyncContext"
import { Text, StyleSheet } from "react-native"
import { useEffect, useState } from "react"
import Box from "../../components/base/Box"
import CustomButton from "../../components/customs/CustomButton"
import DreamListedByUser from "./components/DreamListedByUser"
import Loading from "../../components/base/Loading"
import TagService from "../../services/api/TagService"
import TextBold from "../../components/base/TextBold"

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
            <Box.Center style={ styles.container }>
                <TextBold style={ styles.tagTitle }>TAG { route.params.title }</TextBold>
                {
                    dreams
                        ? dreams.length > 0
                            ? (
                                <Box.Column style={ styles.dreamContainer }>
                                    <TextBold style={ styles.dreamContainerTitle }>SONHOS:</TextBold>
                                    <Box.Column style={ styles.dreamsContainer }>
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
                                                    titleSize={ 23 }
                                                    key={ i }
                                                />
                                            })
                                        }
                                    </Box.Column>
                                </Box.Column>
                            )
                            : <Text>Nenhum sono encontrado.</Text>
                        : errorMessage
                            ? (
                                <Box.Column>
                                    <Text>Houve um erro ao buscar os sonhos da tag { route.params.title }:</Text>
                                    <Text>{ errorMessage }</Text>
                                </Box.Column>
                            )
                            : <Loading onlyLoading={ false } text="Buscando Sonhos..." />
                }
                <CustomButton
                    title="Voltar"
                    onPress={ () => dreamsStackNavigation.goBack() }
                />
            </Box.Center>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        gap: 15,
    },
    tagTitle: {
        fontSize: 30,
    },
    dreamContainer: {
        width: '100%',
    },
    dreamContainerTitle: {
        fontSize: 25,
    },
    dreamsContainer: {
        paddingLeft: 20,
        gap: 10,
    },
})