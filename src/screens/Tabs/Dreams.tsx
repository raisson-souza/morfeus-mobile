import { createStackNavigator } from "@react-navigation/stack"
import { DreamsHome } from "../Dreams/DreamsHome"
import { DreamsList } from "../Dreams/DreamsList"
import { GetDream } from "../Dreams/GetDream"
import { UpdateDream } from "../Dreams/UpdateDream"

export type DreamsStackNavigationParams = {
    DreamsHome: undefined
    DreamsList: undefined
    GetDream: { id: number }
    UpdateDream: { id: number }
}

const Stack = createStackNavigator<DreamsStackNavigationParams>()

const stackNavigatorScreenOptions = {
    /** Cor do header */
    headerStyle: { backgroundColor: "darkblue" },
    /** Cor do título do header */
    headerTintColor: "white",
}

/** Stack dos sonhos */
const DreamsStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="DreamsHome"
            screenOptions={{ ...stackNavigatorScreenOptions }}
        >
            <Stack.Screen
                name="DreamsHome"
                component={ DreamsHome }
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="DreamsList"
                component={ DreamsList }
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="GetDream"
                component={ GetDream }
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="UpdateDream"
                component={ UpdateDream }
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default DreamsStack