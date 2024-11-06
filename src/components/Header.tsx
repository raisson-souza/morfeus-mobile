import { AuthContextProvider } from "../contexts/AuthContext"
import { LocalStorage } from "../utils/LocalStorage"
import { StackHeaderProps } from "@react-navigation/stack"
import { useState, useTransition } from "react"
import { View, Text, StyleSheet } from "react-native"
import CustomButton from "./CustomButton"
import CustomModal from "./CustomModal"
import Icon from "react-native-vector-icons/Ionicons"

export default function Header(props: StackHeaderProps): JSX.Element {
    const [ modalOpen, setModalOpen ] = useState<boolean>(false)
    const authContext = AuthContextProvider()
    const [ _, startTransition ] = useTransition()

    const logOff = async () => {
        await LocalStorage.logoff()
        startTransition(() => {
            authContext.setIsLogged(false)
            setModalOpen(false)
        })
        props.navigation.navigate("Info")
    }

    return (
        <View style={ styles.style }>
            <CustomModal
                visible={ modalOpen }
                setVisible={ setModalOpen }
            >
                <Text>Realmente deseja sair?</Text>
                <CustomButton
                    title="SIM"
                    onPress={ logOff }
                />
                <CustomButton
                    title="NÃO"
                    onPress={ () => setModalOpen(false) }
                />
            </CustomModal>
            <View style={ styles.logo }>
                <Icon name="moon-outline" color="white" size={ 20 } />
                <Text style={ styles.logoText }>Morfeus</Text>
            </View>
            { /* SUBSTITUIR VIEW DEBAIXO PELO MENU */}
            <View>
                <CustomButton title="Ver Perfil" onPress={ () => { /*props.navigation.navigate("User")*/ } }/>
                <CustomButton title="Sair" onPress={ () => { setModalOpen(true) } }/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    style: {
        backgroundColor: "darkblue",
        paddingTop: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 5,
        paddingRight: 5,
    },
    logo: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
    },
    logoText: {
        color: "white",
        fontSize: 18,
    },
})