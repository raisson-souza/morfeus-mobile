import { CreateDream } from "../Dreams/CreateDream"
import { CreateFastDream } from "../Dreams/CreateFastDream"
import { createStackNavigator } from "@react-navigation/stack"
import { DreamsHome } from "../Dreams/DreamsHome"
import { DreamsList } from "../Dreams/DreamsList"
import { ExportDreams } from "../Dreams/ExportDreams"
import { GetDream } from "../Dreams/GetDream"
import { ImportDreams } from "../Dreams/ImportDreams"
import { UpdateDream } from "../Dreams/UpdateDream"

export type DreamsStackNavigationParams = {
    DreamsHome: undefined
    DreamsList: undefined
    GetDream: { id: number }
    UpdateDream: { id: number }
    CreateDream: undefined
    CreateFastDream: undefined
    ExportDreams: undefined
    ImportDreams: undefined
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
            <Stack.Screen
                name="CreateDream"
                component={ CreateDream }
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CreateFastDream"
                component={ CreateFastDream }
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ImportDreams"
                component={ ImportDreams }
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ExportDreams"
                component={ ExportDreams }
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default DreamsStack