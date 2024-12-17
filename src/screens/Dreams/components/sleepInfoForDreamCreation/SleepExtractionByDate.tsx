import { CreateCompleteDreamModel } from "../../../../types/dream"
import { DateTime } from "luxon"
import { Picker } from "@react-native-picker/picker"
import { StyleSheet } from "react-native"
import Box from "../../../../components/base/Box"
import DatePickerShow from "../../../../components/DatePickerShow"
import TextBold from "../../../../components/base/TextBold"

type SleepExtractionByDateProps = {
    setDate: React.Dispatch<React.SetStateAction<CreateCompleteDreamModel>>
    date: CreateCompleteDreamModel
    defaultDate: DateTime<true>
}

export default function SleepExtractionByDate({ date, setDate, defaultDate }: SleepExtractionByDateProps) {
    return (
        <Box.Column style={ styles.container }>
            <TextBold style={ styles.text }>Defina a data do ciclo de sono referente</TextBold>
            <DatePickerShow
                date={ date.dreamNoSleepDateKnown?.date ?? defaultDate.toJSDate() }
                onChange={ (e) => {
                    setDate({
                        ...date,
                        dreamNoSleepDateKnown: {
                            period: date.dreamNoSleepDateKnown?.period ?? "morning",
                            date: e
                        }
                    })
                }}
                textStyle={ styles.text }
                iconColor="white"
            />
            <TextBold style={ styles.text }>Defina o período do ciclo de sono</TextBold>
            <Picker
                selectedValue={ date.dreamNoSleepDateKnown?.period ?? "morning" }
                onValueChange={ (e) => {
                    setDate({
                        ...date,
                        dreamNoSleepDateKnown: {
                            date: date.dreamNoSleepDateKnown?.date ?? defaultDate.toJSDate(),
                            period: e as any
                        }
                    })
                }}
                style={{ color: "white" }}
            >
                <Picker.Item label="Manhã" value="morning" />
                <Picker.Item label="Tarde" value="afternoon" />
                <Picker.Item label="Noite" value="night" />
            </Picker>
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