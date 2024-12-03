import { DateFormatter } from "../../../utils/DateFormatter"
import { SimpleSleepModel } from "../../../types/simpleSleep"
import { StyleSheet } from "react-native"
import { useEffect, useState } from "react"
import Box from "../../../components/base/Box"
import CustomButton from "../../../components/customs/CustomButton"
import DatePickerShow from "../../../components/DatePickerShow"
import Info from "../../../components/base/Info"
import isNil from "../../../utils/IsNill"
import Loading from "../../../components/base/Loading"
import SimpleSleepService from "../../../services/api/SimpleSleepService"
import SimpleSleepStatus from "./SimpleSleepStatus"
import TextBold from "../../../components/base/TextBold"
import TimePickerShow from "../../../components/TimePickerShow"

type SimpleSleepProps = {
}

export default function SimpleSleep({}: SimpleSleepProps) {
    const [ loading, setLoading ] = useState<boolean>(true)
    const [ simpleSleep, setSimpleSleep ] = useState<SimpleSleepModel>({
        sleepStart: null,
        sleepEnd: null,
        sleepId: null,
    })
    const [ simpleSleepUpdated, setSimpleSleepUpdated ] = useState<boolean>(false)
    const sleepStartExample = DateFormatter.fixUTC(DateFormatter.decreaseTime(24, new Date(new Date().setHours(21,0,0,0)).getTime()).getTime())
    const sleepEndExample = DateFormatter.fixUTC(new Date(new Date().setHours(7,0,0,0)).getTime())

    const fetchSimpleSleep = async () => {
        await SimpleSleepService.GetSimpleSleep()
            .then(result => {
                if (result.Success) {
                    if (
                        result.Data.sleepStart &&
                        result.Data.sleepEnd &&
                        result.Data.sleepId
                    ) {
                        setSimpleSleep({
                            sleepStart: DateFormatter.fixUTC(new Date(result.Data.sleepStart).getTime()),
                            sleepEnd: DateFormatter.fixUTC(new Date(result.Data.sleepEnd).getTime()),
                            sleepId: result.Data.sleepId,
                        })
                    }
                }
                setSimpleSleepUpdated(result.Success)
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchSimpleSleep()
    }, [])

    const updateSimpleSleep = async (date: Date, simpleSleepPeriod: "sleepStart" | "sleepEnd") => {
        const sleepStart = new Date(simpleSleepPeriod === "sleepStart" ? date.getTime() : simpleSleep.sleepStart!.getTime())
        const sleepEnd = new Date(simpleSleepPeriod === "sleepEnd" ? date.getTime() : simpleSleep.sleepEnd!.getTime())

        if (isUserEditingSleep(sleepStart, sleepEnd)) {
            setSimpleSleepUpdated(false)
            return
        }

        setLoading(true)
        const response = await SimpleSleepService.CreateSimpleSleep({
            sleepStart: DateFormatter.forBackend.timestamp(sleepStart.getTime()),
            sleepEnd: DateFormatter.forBackend.timestamp(sleepEnd.getTime()),
            sleepId: simpleSleep.sleepId
        })
        setSimpleSleepUpdated(response.Success)
        await fetchSimpleSleep()
    }

    const isUserEditingSleep = (sleepStart: Date, sleepEnd: Date) => {
        if (
            sleepStart.getTime() === sleepEnd.getTime() ||
            sleepStart.getTime() > sleepEnd.getTime() ||
            // Se o tempo de sono for igual ou maior que um dia
            (sleepEnd.getTime() - sleepStart.getTime()) >= 86400000
        ) return true
        return false
    }

    const preserveDateModifyTime = (date: Date, newTime: Date) => {
        const formattedDateString = `${ DateFormatter.removeTime(date.toISOString()) }T${ DateFormatter.removeDate(newTime.toISOString()) }.000-03:00`
        return DateFormatter.fixUTC(new Date(formattedDateString).getTime())
    }

    const resetSimpleSleep = () => {
        setSimpleSleep({
            sleepStart: sleepStartExample,
            sleepEnd: sleepEndExample,
            sleepId: null,
        })
        setSimpleSleepUpdated(false)
    }

    if (loading) return <Loading />

    if (isNil(simpleSleep.sleepStart) && isNil(simpleSleep.sleepEnd)) {
        return (
            <Box.Column style={ styles.container }>
                <TextBold>Nenhum sono recente cadastrado.</TextBold>
                <CustomButton title="Cadastrar Sono Rápido" onPress={ () => { setSimpleSleep({ sleepStart: sleepStartExample, sleepEnd: sleepEndExample, sleepId: null }) } } />
            </Box.Column>
        )
    }

    return (
        <Box.Column style={ styles.container }>
            <Info
                infoDescription="O que é isso?"
                modalTitle="Sono Simples"
                modalDescription="Se você deseja cadastrar de forma rápida a última vez que dormiu, utilize este formulário, se precisar cadastrar um sono completo, utilize a aba 'ciclos de sono'!"
            />
            <Box.Column style={ styles.timePickerContainer }>
                <TextBold style={ styles.timePickerContainerTitle }>Quando você dormiu pela última vez?</TextBold>
                <Box.Column style={ styles.timePickersBox }>
                    <DatePickerShow
                        date={ simpleSleep.sleepStart! }
                        onChange={ async (e) => {
                            const fixedDate = preserveDateModifyTime(e, simpleSleep.sleepStart!)
                            setSimpleSleep({
                                ...simpleSleep,
                                sleepStart: fixedDate
                            })
                            await updateSimpleSleep(fixedDate, "sleepStart")
                        }}
                        textStyle={ styles.timePickersBoxText }
                        iconColor="white"
                    />
                    <TimePickerShow
                        time={ simpleSleep.sleepStart! }
                        onChange={ async (e) => {
                            const fixedDate = preserveDateModifyTime(simpleSleep.sleepStart!, e)
                            setSimpleSleep({
                                ...simpleSleep,
                                sleepStart: fixedDate
                            })
                            await updateSimpleSleep(fixedDate, "sleepStart")
                        }}
                        textStyle={ styles.timePickersBoxText }
                        iconColor="white"
                    />
                </Box.Column>
            </Box.Column>
            <Box.Column style={ styles.timePickerContainer }>
                <TextBold style={ styles.timePickerContainerTitle }>Quando você acordou?</TextBold>
                <Box.Column style={ styles.timePickersBox }>
                    <DatePickerShow
                        date={ simpleSleep.sleepEnd! }
                        onChange={ async (e) => {
                            const fixedDate = preserveDateModifyTime(e, simpleSleep.sleepEnd!)
                            setSimpleSleep({
                                ...simpleSleep,
                                sleepEnd: fixedDate
                            })
                            await updateSimpleSleep(fixedDate, "sleepEnd")
                        }}
                        textStyle={ styles.timePickersBoxText }
                        iconColor="white"
                    />
                    <TimePickerShow
                        time={ simpleSleep.sleepEnd! }
                        onChange={ async (e) => {
                            const fixedDate = preserveDateModifyTime(simpleSleep.sleepEnd!, e)
                            setSimpleSleep({
                                ...simpleSleep,
                                sleepEnd: fixedDate
                            })
                            await updateSimpleSleep(fixedDate, "sleepEnd")
                        }}
                        textStyle={ styles.timePickersBoxText }
                        iconColor="white"
                    />
                </Box.Column>
            </Box.Column>
            <SimpleSleepStatus
                isOk={ simpleSleepUpdated }
                resetSimpleSleep={ resetSimpleSleep }
                fetchSimpleSleep={ fetchSimpleSleep }
                setLoading={ setLoading }
            />
        </Box.Column>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        gap: 5,
    },
    timePickerContainer: {
        gap: 5,
    },
    timePickerContainerTitle: {
        fontSize: 20,
    },
    timePickersBox: {
        backgroundColor: "darkblue",
        padding: 10,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: "center",
        gap: 5,
    },
    timePickersBoxText: {
        color: "white",
        fontSize: 22,
    },
})