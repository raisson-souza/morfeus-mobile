import { DateFormatter } from "../../../utils/DateFormatter"
import { DreamListedByUserType } from "../../../types/dream"
import { DreamsStackNavigationParams } from "../../Tabs/Dreams"
import { StackNavigationProp } from "@react-navigation/stack"
import { Text, Pressable, StyleSheet } from "react-native"
import Box from "../../../components/base/Box"

type DreamListedByUserProps = {
    navigate:
        StackNavigationProp<DreamsStackNavigationParams, "DreamsList"> |
        StackNavigationProp<DreamsStackNavigationParams, "GetTag">
    dream: DreamListedByUserType
    showDate?: boolean
    titleSize?: number
}

export default function DreamListedByUser({ dream, navigate, showDate = true, titleSize = 30 }: DreamListedByUserProps) {

    const treatDate = () => {
        const dateFormatted = DateFormatter.removeTime(dream.date).split("-")
        return `${ dateFormatted[1] }-${ dateFormatted[2] }`
    }
    const treatedDate = treatDate()

    return (
        <Box.Column style={ styles.container }>
            <Pressable onPress={ () => navigate.navigate("GetDream", { id: dream.id, sleepDate: treatedDate }) }>
                <Text style={{
                    ...styles.title,
                    fontSize: titleSize
                }}>{ dream.title }</Text>
            </Pressable>
            {
                showDate
                    ? <Text style={ styles.dateText }>{ treatedDate }</Text>
                    : <></>
            }
            <Box.Row style={ styles.tags }>
                {
                    dream.tags.map((tag, i) => (
                        <Pressable
                            onPress={ () => navigate.navigate("GetTag", { title: tag.title, id: tag.id }) }
                            key={ i }
                        >
                            <Text>{ tag.title }</Text>
                        </Pressable>
                    ))
                }
            </Box.Row>
        </Box.Column>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    title: {
        fontWeight: "bold",
    },
    dateText: {
        fontSize: 20,
        fontWeight: "100",
    },
    tags: {
        gap: 10,
    },
})