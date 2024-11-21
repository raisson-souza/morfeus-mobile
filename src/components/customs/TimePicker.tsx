import { DateTimePickerAndroid } from "@react-native-community/datetimepicker"
import CustomButton, { CustomButtonProps } from "./CustomButton"
import React from "react"

type TimePickerProps = {
    onChange: (e: Date) => void
    date: Date
    buttonProps?: CustomButtonProps
}

/**
 * TODO:
 * - Ajustar onChange de DateTimePickerAndroid.open em TimePicker e DatePicker conforme TimePickerShow e DatePickerShow
 * - Trocar nome showMode
 * - Implementar UTCfix em DateFormatter
 */

export default function TimePicker({ onChange, date, buttonProps }: TimePickerProps) {
    const showMode = () => {
        DateTimePickerAndroid.open({
            value: date,
            onChange: (_, date) => {
                if (date) onChange(date)
            },
            mode: "time",
            is24Hour: true,
        })
    }

    return <CustomButton { ...buttonProps } title="Selecionar Hora" onPress={ () => showMode() } />
}