import { StyleSheet, Text } from "react-native"
import Box from "./Box"
import CustomModal, { CustomModalProps } from "../customs/CustomModal"

type ModalBoxProps = Omit<CustomModalProps, "children">  & {
    title?: string
    description: string | string[] | JSX.Element | JSX.Element[]
    children?: JSX.Element
}

export default function ModalBox({ title, description, children, ...customModalProps }: ModalBoxProps) {
    const renderModalContent = () => {
        if (description instanceof Array) {
            if (typeof description[0] === "string") {
                return (description as string[]).map((str, i) => (
                    <Text style={ styles.contentText } key={ i }>{ str }</Text>
                ))
            }
            else {
                return description as JSX.Element[]
            }
        }
        else if (typeof description === "string") {
            return <Text style={ styles.contentText }>{ description }</Text>
        }
        else {
            return description
        }
    }

    return (
        <>
            <CustomModal { ...customModalProps }>
                <Box.Column style={ styles.container }>
                    {
                        title
                            ? <>
                                <Box.Row style={ styles.titleContainer }>
                                    <Text style={ styles.titleText }>{ title }</Text>
                                </Box.Row>
                                <Box.Column style={ styles.contentContainer }>{ renderModalContent() }</Box.Column>
                            </>
                            : <Box.Column style={ styles.contentContainer }>{ renderModalContent() }</Box.Column>
                    }
                </Box.Column>
            </CustomModal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "darkblue",
        alignItems: "center",
        width: "80%",
        gap: 10,
        padding: 10,
        borderRadius: 15,
    },
    titleContainer: {
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: "white",
    },
    contentContainer: {
        gap: 5,
        alignItems: "center",
    },
    titleText: {
        color: "white",
        fontSize: 22,
    },
    contentText: {
        color: "white",
        fontSize: 18,
    },
})