import { CreateCompleteDreamModel, CreateDreamModel } from "../../types/dream"
import { createContext, useContext, useState } from "react"
import { DateFormatter } from "../../utils/DateFormatter"
import { DreamsStackNavigationParams } from "../Tabs/Dreams"
import { StackNavigationProp } from "@react-navigation/stack"
import CreateCompleteDream from "./components/CreateCompleteDream"
import CustomButton from "../../components/customs/CustomButton"
import DefineDreamSleep from "./components/CompleteDreamDate"
import DreamService from "../../services/api/DreamService"
import Info from "../../components/base/Info"
import Loading from "../../components/base/Loading"
import React from "react"

type CreateDreamContext = {
    dreamModel: CreateDreamModel
    setDreamModel: React.Dispatch<React.SetStateAction<CreateDreamModel>>
    completeDreamModel: CreateCompleteDreamModel
    setCompleteDreamModel: React.Dispatch<React.SetStateAction<CreateCompleteDreamModel>>
}

const CreateDreamContext = createContext<CreateDreamContext | null>(null)

type CreateDreamContextComponentProps = {
    dreamsStackNavigation: StackNavigationProp<DreamsStackNavigationParams, "CreateDream">
    isOnline: boolean
}

export default function CreateDreamContextComponent({
    dreamsStackNavigation,
    isOnline,
}: CreateDreamContextComponentProps) {
    const [ dreamModel, setDreamModel ] = useState<CreateDreamModel>({
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
        sleepId: null,
    })
    const [ completeDreamModel, setCompleteDreamModel ] = useState<CreateCompleteDreamModel>({
        dreamNoSleepDateKnown: null,
        dreamNoSleepTimeKnown: null,
    })
    const [ loading, setLoading ] = useState<boolean>(false)

    const createDream = async () => {
        setLoading(true)
        await DreamService.Create(isOnline, {
            ...dreamModel,
            sleepId: dreamModel.sleepId,
            dreamNoSleepDateKnown: completeDreamModel.dreamNoSleepDateKnown
                ? {
                    date: DateFormatter.forBackend.date(completeDreamModel.dreamNoSleepDateKnown.date.getTime()),
                    period: completeDreamModel.dreamNoSleepDateKnown.period
                }
                : null,
            dreamNoSleepTimeKnown: completeDreamModel.dreamNoSleepTimeKnown
                ? {
                    date: DateFormatter.forBackend.date(completeDreamModel.dreamNoSleepTimeKnown.date.getTime()),
                    sleepStart: DateFormatter.forBackend.timestamp(completeDreamModel.dreamNoSleepTimeKnown.sleepStart.getTime()),
                    sleepEnd: DateFormatter.forBackend.timestamp(completeDreamModel.dreamNoSleepTimeKnown.sleepEnd.getTime()),
                }
                : null,
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

    const setSleepId = (id: number | null) => {
        setDreamModel({
            ...dreamModel,
            sleepId: id,
        })
    }

    return (
        <CreateDreamContext.Provider
            value={{
                dreamModel: dreamModel,
                setDreamModel: setDreamModel,
                completeDreamModel: completeDreamModel,
                setCompleteDreamModel: setCompleteDreamModel,
            }}
        >
            <DefineDreamSleep
                date={ completeDreamModel }
                setDate={ setCompleteDreamModel }
                sleepId={ dreamModel.sleepId }
                setSleepId={ setSleepId }
            />
            <CreateCompleteDream />
            <Info
                infoDescription="Sua noite de sono"
                modalTitle="NOITE DE SONO"
                modalDescription={[
                    "Agora você está cadastrando um sonho completo, mas durante a noite na qual esse sonho ocorreu você suou? dormiu cansado?",
                    "Não esqueça de preencher essas informações editando a noite de sono que será criada para você ao salvar esse sonho!"
                ]}
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
        </CreateDreamContext.Provider>
    )
}

export function CreateDreamContextProvider() {
    const context = useContext(CreateDreamContext)
    if (!context) throw new Error("AuthContext chamado fora do provider.")
    return context
}