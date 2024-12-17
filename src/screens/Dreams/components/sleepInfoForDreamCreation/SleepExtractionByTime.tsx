import { CreateCompleteDreamModel } from "../../../../types/dream"
import { DateFormatter } from "../../../../utils/DateFormatter"
import { DateTime } from "luxon"
import { StyleSheet } from "react-native"
import { useState } from "react"
import Box from "../../../../components/base/Box"
import CustomSwitch from "../../../../components/customs/CustomSwitch"
import DatePickerShow from "../../../../components/DatePickerShow"
import TextBold from "../../../../components/base/TextBold"
import TimePickerShow from "../../../../components/TimePickerShow"

type SleepExtractionByTimeProps = {
    setDate: React.Dispatch<React.SetStateAction<CreateCompleteDreamModel>>
    date: CreateCompleteDreamModel
    defaultDate: DateTime<true>
}

export default function SleepExtractionByTime({ date, setDate, defaultDate }: SleepExtractionByTimeProps) {
    const [ isSleepStartYesterday, setIsSleepStartYesterday ] = useState<boolean>(false)
    const parsedDefaultDate = DateFormatter.fixUTC(defaultDate.toMillis())

    return (
        <Box.Column style={ styles.container }>
            <TextBold style={ styles.text }>Data referente ao ciclo de sono</TextBold>
            <DatePickerShow
                date={ date.dreamNoSleepTimeKnown?.date ?? parsedDefaultDate }
                onChange={ (e) => {
                    setDate({
                        ...date,
                        dreamNoSleepTimeKnown: {
                            date: e,
                            sleepStart: date.dreamNoSleepTimeKnown?.sleepStart ?? parsedDefaultDate,
                            sleepEnd: date.dreamNoSleepTimeKnown?.sleepEnd ?? parsedDefaultDate
                        }
                    })
                }}
                textStyle={ styles.text }
                iconColor="white"
            />
            <Box.Column>
                <TextBold style={ styles.text }>Horário de dormir</TextBold>
                <CustomSwitch
                    label="Dormiu no dia anterior?"
                    onChange={ (e) => { setIsSleepStartYesterday(e) }}
                    value={ isSleepStartYesterday }
                    labelStyle={{ color: "white" }}
                />
            </Box.Column>
            <TimePickerShow
                time={ date.dreamNoSleepTimeKnown?.sleepStart ?? parsedDefaultDate }
                onChange={ (e) => {
                    const newTime = DateTime.fromJSDate(e)
                    const newSleepStart = isSleepStartYesterday
                        ? DateTime.fromMillis(defaultDate.toMillis()).set({ hour: newTime.hour, minute: newTime.minute, second: newTime.second }).minus({ day: 1 })
                        : DateTime.fromMillis(defaultDate.toMillis()).set({ hour: newTime.hour, minute: newTime.minute, second: newTime.second })
                    setDate({
                        ...date,
                        dreamNoSleepTimeKnown: {
                            date: date.dreamNoSleepTimeKnown?.date ?? parsedDefaultDate,
                            sleepStart: newSleepStart.toJSDate(),
                            sleepEnd: date.dreamNoSleepTimeKnown?.sleepEnd ?? parsedDefaultDate
                        }
                    })
                }}
                textStyle={ styles.text }
                iconColor="white"
            />
            <TextBold style={ styles.text }>Horário de acordar</TextBold>
            <TimePickerShow
                time={ date.dreamNoSleepTimeKnown?.sleepEnd ?? parsedDefaultDate }
                onChange={ (e) => {
                    const newTime = DateTime.fromJSDate(e)
                    const newSleepEnd = DateTime.fromMillis(defaultDate.toMillis()).set({ hour: newTime.hour, minute: newTime.minute, second: newTime.second })
                    setDate({
                        ...date,
                        dreamNoSleepTimeKnown: {
                            date: date.dreamNoSleepTimeKnown?.date ?? parsedDefaultDate,
                            sleepStart: date.dreamNoSleepTimeKnown?.sleepStart ?? parsedDefaultDate,
                            sleepEnd: newSleepEnd.toJSDate()
                        }
                    })
                }}
                textStyle={ styles.text }
                iconColor="white"
            />
        </Box.Column>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 10,
    },
    text: {
        color: "white",
        fontSize: 18,
    },
})