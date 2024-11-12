import { createStackNavigator } from "@react-navigation/stack"
import { DreamsHome } from "../screens/Dreams/DreamsHome"
import { DreamsList } from "../screens/Dreams/DreamsList"
import { GetDream } from "../screens/Dreams/GetDream"
import { UpdateDream } from "../screens/Dreams/UpdateDream"

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