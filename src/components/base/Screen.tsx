import { StyleSheet, ScrollView } from "react-native"

type ScreenProps = {
    children: JSX.Element[] | JSX.Element
}

/** Componente padrão de tela */
export const Screen: React.FC<ScreenProps> = ({ children }) => {
    return (
        <ScrollView contentContainerStyle={ styles.container }>
            { children }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
})