import { StyleProp, View, ViewStyle } from "react-native"

type CustomBoxProps<T> = {
    children: JSX.Element | JSX.Element[]
    style?: StyleProp<T>
}

type BoxProps = {
    Column: (props: CustomBoxProps<ViewStyle>) => JSX.Element
    Center: (props: CustomBoxProps<ViewStyle>) => JSX.Element
    Row: (props: CustomBoxProps<ViewStyle>) => JSX.Element
}

const Box: BoxProps = { 
    Column: ({ children, style }) => {
        return <View style={{
            display: "flex",
            flexDirection: "column",
            ...style as any,
        }}>
            { children }
        </View>
    },
    Center: ({ children, style }) => {
        return <View style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            ...style as any,
        }}>
            { children }
        </View>
    },
    Row: ({ children, style }) => {
        return <View style={{
            display: "flex",
            flexDirection: "row",
            ...style as any,
        }}>
            { children }
        </View>
    },
}

export default Box