import { ActivityIndicator, Text, View } from "react-native"

type LoadingProps = {
    onlyLoading?: boolean
    text?: string
}

/** Componente de loading padrão para a aplicação */
export default function Loading({
    onlyLoading = true,
    text = "Carregando..."
}: LoadingProps) {
    return (
        <View>
            <ActivityIndicator
                color="darkblue"
                size="large"
            />
            {
                onlyLoading
                    ? <></>
                    : <Text>{ text }</Text>
            }
        </View>
    )
}