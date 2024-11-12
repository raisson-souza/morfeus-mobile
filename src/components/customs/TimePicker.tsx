import { DateTimePickerAndroid } from "@react-native-community/datetimepicker"
import CustomButton, { CustomButtonProps } from "./CustomButton"
import React from "react"

type TimePickerProps = {
    setDate: React.Dispatch<React.SetStateAction<Date>>
    date: Date
    buttonProps?: CustomButtonProps
}

export default function TimePicker({ setDate, date, buttonProps }: TimePickerProps) {
    const showMode = () => {
        DateTimePickerAndroid.open({
            value: date,
            onChange: (_, date) => {
                if (date) setDate(date)
            },
            mode: "time",
            is24Hour: true,
        })
    }

    return <CustomButton { ...buttonProps } title="Selecionar Hora" onPress={ () => showMode() } />
}