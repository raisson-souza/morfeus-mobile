import { Pressable, StyleSheet, Text } from "react-native"
import Box from "../../../components/base/Box"
import CustomButton from "../../../components/customs/CustomButton"
import CustomModal from "../../../components/customs/CustomModal"
import IconAntDesign from "react-native-vector-icons/AntDesign"
import ModalActionConfirm from "../../../components/base/ModalActionConfirm"
import React, { useState } from "react"

type SimpleSleepStatusProps = {
    isOk: boolean
    resetSimpleSleep: () => void
    fetchSimpleSleep: () => Promise<void>
}

export default function SimpleSleepStatus({ isOk, resetSimpleSleep, fetchSimpleSleep }: SimpleSleepStatusProps) {
    const [ isActionModalOpen, setIsActionModalOpen ] = useState<boolean>(false)
    const [ isInfoModalOpen, setIsInfoModalOpen ] = useState<boolean>(false)

    const handleResetConfirmation = (reset: boolean) => {
        if (!reset) return
        resetSimpleSleep()
    }

    return (
        <>
            <CustomModal
                visible={ isInfoModalOpen }
                setVisible={ setIsInfoModalOpen }
            >
                <Box.Column style={ styles.infoModalContainer }>
                    {
                        isOk
                            ? (
                                <>
                                    <Text style={ styles.infoModalText }>Seu sono simples foi salvo com sucesso, edite se necessário!</Text>
                                </>
                            )
                            : (
                                <>
                                    <Text style={ styles.infoModalText }>Seu sono simples ainda não foi salvo!</Text>
                                    <Text style={ styles.infoModalText }>Se está criando-o pela primeira vez, troque as datas.</Text>
                                    <Text style={ styles.infoModalText }>Se já trocou alguma data e o aviso persiste, seu sono pode estar em conflito com outro, troque novamente.</Text>
                                    <Text style={ styles.infoModalText }>Não se preocupe com esse aviso, você não precisa criar outro sono simples se não quiser!</Text>
                                </>
                            )
                    }
                </Box.Column>
            </CustomModal>
            <ModalActionConfirm
                description={[
                    "Ao criar um novo sono simples, o anterior permanecerá salvo, mas não poderá ser editado por aqui.",
                    "Para editar o sono anterior, procure-o na listagem de sonos ou cancele a criação do próximo sono simples.",
                ]}
                isOpen={ isActionModalOpen }
                setIsOpen={ setIsActionModalOpen }
                onChange={ (e) => handleResetConfirmation(e) }
            />
            <Box.Row style={ styles.infoSimpleSleep }>
                {
                    isOk
                        ? <>
                            <CustomButton title="Cadastrar novo sono simples" onPress={ () => setIsActionModalOpen(true) } />
                            <Pressable onPress={ () => setIsInfoModalOpen(true) }><IconAntDesign name="checkcircle" color="green" size={ 25 } /></Pressable>
                        </>
                        : <>
                            <CustomButton title="Não cadastrar novo sono simples" onPress={ async () => { await fetchSimpleSleep() } } />
                            <Pressable onPress={ () => setIsInfoModalOpen(true) }><IconAntDesign name="closecircle" color="red" size={ 25 } /></Pressable>
                        </>
                }
            </Box.Row>
        </>
    )
}

const styles = StyleSheet.create({
    infoModalContainer: {
        padding: 10,
        backgroundColor: "royalblue",
        width: "75%",
        gap: 5,
    },
    infoModalText: {
        fontSize: 19,
        color: "white",
    },
    infoSimpleSleep: {
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        paddingTop: 5,
    },
})