import { Text, StyleSheet } from "react-native"
import { useState } from "react"
import Box from "./Box"
import CustomModal from "../customs/CustomModal"
import IconEvilIcons from "react-native-vector-icons/EvilIcons"
import IconFeather from "react-native-vector-icons/Feather"
import TextBold from "./TextBold"

type InfoProps = {
    type?: "error" | "warn" | "success" | "info" | "question"
    infoDescription?: string
    modalTitle: string
    modalDescription: string
    overrideInfoColor?: string
}

export default function Info({ type = "info", infoDescription, modalTitle, modalDescription, overrideInfoColor }: InfoProps) {
    const [ open, setOpen ] = useState<boolean>(false)

    const renderColor = () => {
        switch (type) {
            case "info": return "black"
            case "warn": return "yellow"
            case "error": return "red"
            case "success": return "green"
            case "question": return "black"
            default: return "black"
        }
    }

    return (
        <>
            <CustomModal
                visible={ open }
                setVisible={ setOpen }
                animationType="slide"
                blurBackground
            >
                <Box.Column style={ styles.container }>
                    {
                        modalTitle
                            ? <TextBold style={ styles.modalTitle }>{ modalTitle.toUpperCase() }</TextBold>
                            : <></>
                    }
                    <Text style={ styles.modalDescription }>{ modalDescription }</Text>
                </Box.Column>
            </CustomModal>
            <Box.Row style={ styles.infoContainer }>
                {
                    type === "question"
                        ? (
                            <IconEvilIcons
                                name="question"
                                size={ 20 }
                                color={
                                    overrideInfoColor
                                        ? overrideInfoColor
                                        : renderColor()
                                }
                                onPress={ () => setOpen(true) }
                            />
                        )
                        : (
                            <IconFeather
                                name="info"
                                size={ 20 }
                                color={
                                    overrideInfoColor
                                        ? overrideInfoColor
                                        : renderColor()
                                }
                                onPress={ () => setOpen(true) }
                            />
                        )
                }
                {
                    infoDescription
                        ? (
                            <Text
                                style={{
                                    ...styles.infoTitle,
                                    color: overrideInfoColor
                                        ? overrideInfoColor
                                        : renderColor()
                                }}
                                onPress={ () => setOpen(true) }
                            >
                                { infoDescription }
                            </Text>
                        )
                        : <></>
                }
                
            </Box.Row>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "80%",
        backgroundColor: "darkblue",
        gap: 10,
        padding: 10,
        borderRadius: 15,
    },
    infoContainer: {
        gap: 5,
    },
    infoTitle: {
    },
    modalTitle: {
        color: "white",
        fontSize: 22,
    },
    modalDescription: {
        color: "white",
        fontSize: 18,
    },
})