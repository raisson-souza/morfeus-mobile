import { DateFormatter } from "../../../utils/DateFormatter"
import { DreamListedByUserType } from "../../../types/dream"
import { DreamsStackNavigationParams } from "../../Tabs/Dreams"
import { StackNavigationProp } from "@react-navigation/stack"
import { Text, View, Pressable, StyleSheet } from "react-native"

type DreamListedByUserProps = {
    navigate:
        StackNavigationProp<DreamsStackNavigationParams, "DreamsList"> |
        StackNavigationProp<DreamsStackNavigationParams, "GetTag">
    dream: DreamListedByUserType
    showDate?: boolean
}

export default function DreamListedByUser({ dream, navigate, showDate = true }: DreamListedByUserProps) {

    const treatDate = () => {
        const dateFormatted = DateFormatter.removeTime(dream.date).split("-")
        return `${ dateFormatted[1] }-${ dateFormatted[2] }`
    }
    const treatedDate = treatDate()

    return (
        <View>
            <Pressable onPress={ () => navigate.navigate("GetDream", { id: dream.id, sleepDate: treatedDate }) }>
                <Text style={ styles.title }>{ dream.title }</Text>
            </Pressable>
            {
                showDate
                    ? <Text style={ styles.dateText }>{ treatedDate }</Text>
                    : <></>
            }
            
            <View style={ styles.tags }>
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
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
    },
    dateText: {
        fontSize: 20,
        fontWeight: "100",
    },
    tags: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
    },
})