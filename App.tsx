import { AnalysisScreen } from "./src/screens/Tabs/Analysis"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import { DreamsScreen } from "./src/screens/Tabs/Dreams"
import { HomeScreen } from "./src/screens/Tabs/Home"
import { InfoScreen } from "./src/screens/Stack/Info"
import { LoginScreen } from "./src/screens/Stack/Login"
import { NavigationContainer } from "@react-navigation/native"
import { RegistryScreen } from "./src/screens/Stack/Registry"
import { SleepsScreen } from "./src/screens/Tabs/Sleeps"
import { SQLiteProvider } from "expo-sqlite"
import { StatusBar } from "expo-status-bar"
import AuthContextComponent from "./src/contexts/AuthContext"
import Header from "./src/components/Header"
import Icon from "react-native-vector-icons/Ionicons"
import InitialContextComponent from "./src/contexts/InitialContext"
import Migrations from "./db/migrations"
import NotificationEnclosure from "./src/components/base/NotificationEnclosure"
import React from "react"
import SyncContextComponent from "./src/contexts/SyncContext"

/** Parâmetros da navegação por tab */
export type TabNavigationParams = {
  Home: undefined
  Dreams: undefined
  Sleeps: undefined
  Analysis: undefined
}

const Tab = createBottomTabNavigator<TabNavigationParams>()

const tabNavigatorScreenOptionsStyle = {
  /** Cor de fundo da tab ativa */
  tabBarActiveBackgroundColor: "",
  /** Cor de fundo das tabs inativas */
  tabBarInactiveBackgroundColor: "",
  /** Cor de título do header da tab atual */
  headerTintColor: "white",
  /** Cor de fundo do header da tab atual */
  headerStyle: {
    backgroundColor: "darkblue"
  },
  /** Cor de fundo do footer */
  tabBarStyle: {
    backgroundColor: "darkblue"
  }
}

const tabScreenOptions = {
  tabBarLabelStyle: { color: "white"},
  tabBarActiveBackgroundColor: "royalblue",
  tabBarInactiveBackgroundColor: "darkblue"
}

/** Componente de navegação por tab */
const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={ tabNavigatorScreenOptionsStyle }
    >
      <Tab.Screen
        name="Home"
        component={ HomeScreen }
        options={{
          ...tabScreenOptions,
          tabBarIcon: ({ size }) => (<Icon name="home-outline" color="white" size={ size } />),
          tabBarLabel: "Home",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Dreams"
        component={ DreamsScreen }
        options={{
          ...tabScreenOptions,
          tabBarIcon: ({ size }) => (<Icon name="cloudy-outline" color="white" size={ size } />),
          tabBarLabel: "Sonhos",
          title: "Sonhos",
        }}
      />
      <Tab.Screen
        name="Sleeps"
        component={ SleepsScreen }
        options={{
          ...tabScreenOptions,
          tabBarIcon: ({ size }) => (<Icon name="moon-outline" color="white" size={ size } />),
          tabBarLabel: "Noites de Sono",
          title: "Noites de Sono",
        }}
      />
      <Tab.Screen
        name="Analysis"
        component={ AnalysisScreen }
        options={{
          ...tabScreenOptions,
          tabBarIcon: ({ size }) => (<Icon name="bar-chart-outline" color="white" size={ size } />),
          tabBarLabel: "Análises",
          title: "Análises",
        }}
      />
    </Tab.Navigator>
  )
}

/** Parâmetros da navegação por stack */
export type StackNavigationParams = {
  /** Tela inicial de apresentação do App */
  Info: undefined
  /** Home */
  Tabs: undefined
  /** Cadastro de conta */
  Registry: undefined
  /** Login */
  Login: undefined
}

const Stack = createStackNavigator<StackNavigationParams>()

const stackNavigatorScreenOptions = {
  /** Cor do header */
  headerStyle: { backgroundColor: "darkblue" },
  /** Cor do título do header */
  headerTintColor: "white",
}

const App = () => {
  return (
    <SQLiteProvider
      databaseName="database.db"
      onInit={ Migrations }
    >
      <InitialContextComponent>
        <AuthContextComponent>
          <NotificationEnclosure>
            <SyncContextComponent>
              <NavigationContainer>
                <StatusBar />
                <Stack.Navigator
                  initialRouteName="Tabs"
                  screenOptions={{
                    ...stackNavigatorScreenOptions,
                    header: Header,
                  }}
                >
                  <Stack.Screen
                    name="Info"
                    component={ InfoScreen }
                  />
                  <Stack.Screen
                    name="Tabs"
                    component={ TabNavigator }
                  />
                  <Stack.Screen
                    name="Registry"
                    component={ RegistryScreen }
                  />
                  <Stack.Screen
                    name="Login"
                    component={ LoginScreen }
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </SyncContextComponent>
          </NotificationEnclosure>
        </AuthContextComponent>
      </InitialContextComponent>
    </SQLiteProvider>
  )
}

export default App