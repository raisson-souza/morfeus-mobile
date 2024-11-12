import { DateTimePickerAndroid } from "@react-native-community/datetimepicker"
import CustomButton, { CustomButtonProps } from "./CustomButton"
import React from "react"

type DatePickerProps = {
    setDate: React.Dispatch<React.SetStateAction<Date>>
    date: Date
    buttonProps?: CustomButtonProps
}

export default function DatePicker({ setDate, date, buttonProps }: DatePickerProps) {
    const showMode = () => {
        DateTimePickerAndroid.open({
            value: date,
            onChange: (_, date) => {
                if (date) setDate(date)
            },
            mode: "date",
        })
    }

    return <CustomButton { ...buttonProps } title="Selecionar Data" onPress={ () => showMode() } />
}