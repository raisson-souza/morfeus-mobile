import { DateFormatter } from "../../utils/DateFormatter"
import { DreamListedByUserType } from "../../types/dream"
import { DreamsListDreamsStackUseNavigationProps } from "../../screens/Dreams/DreamsList"
import { Text, View, Pressable, StyleSheet } from "react-native"

type DreamListedByUserProps = {
    navigate: DreamsListDreamsStackUseNavigationProps
    dream: DreamListedByUserType
}

export default function DreamListedByUser({ dream, navigate }: DreamListedByUserProps) {

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
            <Text style={ styles.dateText }>{ treatedDate }</Text>
            <View style={ styles.tags }>
                { /** TODO: incluir rota das TAGS */}
                {
                    dream.tags.map((tag, i) => (
                        <Pressable onPress={ () => {} } key={ i }>
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