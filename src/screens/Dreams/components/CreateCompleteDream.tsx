import { CompleteDreamModel } from "../../../types/dream"
import { Picker } from "@react-native-picker/picker"
import { useState } from "react"
import { View, StyleSheet, Pressable, Text } from "react-native"
import CustomButton from "../../../components/customs/CustomButton"
import CustomInput from "../../../components/customs/CustomInput"
import CustomSwitch from "../../../components/customs/CustomSwitch"

type CreateCompleteDream = {
    dream: CompleteDreamModel
    setDream: React.Dispatch<React.SetStateAction<CompleteDreamModel>>
}

export default function CreateCompleteDream({ dream, setDream }: CreateCompleteDream) {
    const [ tag, setTag ] = useState<string>("")

    const appendTag = () => {
        if (tag.trim() === "") return
        const sameTagInDreamTags = dream.tags.filter(dreamTag => dreamTag === tag)
        if (sameTagInDreamTags.length === 0) {
            setDream({
                ...dream,
                tags: [...dream.tags, tag]
            })
            setTag("")
            return
        }
        alert("Tag já adicionada.")
    }

    const removeTag = (tagToRemove: string) => {
        const tagIndexToRemove = dream.tags.findIndex(tagName => tagName === tagToRemove)
        if (tagIndexToRemove === -1) return
        const dreamTags = dream.tags
        dreamTags.splice(tagIndexToRemove, 1)
        setDream({
            ...dream,
            tags: dreamTags
        })
    }

    return (
        <View>
            <CustomInput
                label="Título"
                onChange={ (e) => setDream({ ...dream, title: e }) }
            />
            <CustomInput
                label="Descrição"
                onChange={ (e) => setDream({ ...dream, description: e }) }
            />
            <Picker
                selectedValue={ dream.dreamPointOfViewId }
                onValueChange={ (e) => setDream({
                    ...dream,
                    dreamPointOfViewId: e
                })}
                style={ styles.dreamPointOfViewPicker }
            >
                <Picker.Item label="Primeira Pessoa" value="1" />
                <Picker.Item label="Segunda Pessoa" value="2" />
                <Picker.Item label="Terceira Pessoa" value="3" />
            </Picker>
            <CustomSwitch
                label="Clima Ameno"
                value={ dream.climate.ameno }
                onChange={ (e) => setDream({
                    ...dream,
                    climate: {
                        ...dream.climate,
                        ameno: e,
                        multiplos: false,
                        outro: false,
                        indefinido: false,
                    }
                })}
            />
            <CustomSwitch
                label="Clima Calor"
                value={ dream.climate.calor }
                onChange={ (e) => setDream({
                    ...dream,
                    climate: {
                        ...dream.climate,
                        calor: e,
                        multiplos: false,
                        outro: false,
                        indefinido: false,
                    }
                })}
            />
            <CustomSwitch
                label="Clima Garoa"
                value={ dream.climate.garoa }
                onChange={ (e) => setDream({
                    ...dream,
                    climate: {
                        ...dream.climate,
                        garoa: e,
                        multiplos: false,
                        outro: false,
                        indefinido: false,
                    }
                })}
            />
            <CustomSwitch
                label="Clima Chuva"
                value={ dream.climate.chuva }
                onChange={ (e) => setDream({
                    ...dream,
                    climate: {
                        ...dream.climate,
                        chuva: e,
                        multiplos: false,
                        outro: false,
                        indefinido: false,
                    }
                })}
            />
            <CustomSwitch
                label="Clima Tempestade"
                value={ dream.climate.tempestade }
                onChange={ (e) => setDream({
                    ...dream,
                    climate: {
                        ...dream.climate,
                        tempestade: e,
                        multiplos: false,
                        outro: false,
                        indefinido: false,
                    }
                })}
            />
            <CustomSwitch
                label="Clima Névoa"
                value={ dream.climate.nevoa }
                onChange={ (e) => setDream({
                    ...dream,
                    climate: {
                        ...dream.climate,
                        nevoa: e,
                        multiplos: false,
                        outro: false,
                        indefinido: false,
                    }
                })}
            />
            <CustomSwitch
                label="Clima Neve"
                value={ dream.climate.neve }
                onChange={ (e) => setDream({
                    ...dream,
                    climate: {
                        ...dream.climate,
                        neve: e,
                        multiplos: false,
                        outro: false,
                        indefinido: false,
                    }
                })}
            />
            <CustomSwitch
                label="Clima Múltiplos"
                value={ dream.climate.multiplos }
                onChange={ (e) => setDream({
                    ...dream,
                    climate: {
                        ameno: false,
                        calor: false,
                        garoa: false,
                        chuva: false,
                        tempestade: false,
                        nevoa: false,
                        neve: false,
                        multiplos: e,
                        outro: false,
                        indefinido: false,
                    }
                })}
            />
            <CustomSwitch
                label="Clima Outro"
                value={ dream.climate.outro }
                onChange={ (e) => setDream({
                    ...dream,
                    climate: {
                        ameno: false,
                        calor: false,
                        garoa: false,
                        chuva: false,
                        tempestade: false,
                        nevoa: false,
                        neve: false,
                        multiplos: false,
                        outro: e,
                        indefinido: false,
                    }
                })}
            />
            <CustomSwitch
                label="Clima Indefinido"
                value={ dream.climate.indefinido }
                onChange={ (e) => setDream({
                    ...dream,
                    climate: {
                        ameno: false,
                        calor: false,
                        garoa: false,
                        chuva: false,
                        tempestade: false,
                        nevoa: false,
                        neve: false,
                        multiplos: false,
                        outro: false,
                        indefinido: e,
                    }
                })}
            />
            <Picker
                selectedValue={ dream.dreamHourId }
                onValueChange={ (e) => setDream({
                    ...dream,
                    dreamHourId: e
                })}
                style={ styles.dreamPointOfViewPicker }
            >
                <Picker.Item label="Amanhecer" value="1" />
                <Picker.Item label="Dia" value="2" />
                <Picker.Item label="Anoitecer" value="3" />
                <Picker.Item label="Noite" value="4" />
                <Picker.Item label="Indefinido" value="5" />
                <Picker.Item label="Múltiplos" value="6" />
            </Picker>
            <Picker
                selectedValue={ dream.dreamDurationId }
                onValueChange={ (e) => setDream({
                    ...dream,
                    dreamDurationId: e
                })}
                style={ styles.dreamPointOfViewPicker }
            >
                <Picker.Item label="Instantâneo" value="1" />
                <Picker.Item label="Curto" value="2" />
                <Picker.Item label="Médio" value="3" />
                <Picker.Item label="Longo" value="4" />
            </Picker>
            <Picker
                selectedValue={ dream.dreamLucidityLevelId }
                onValueChange={ (e) => setDream({
                    ...dream,
                    dreamLucidityLevelId: e
                })}
                style={ styles.dreamPointOfViewPicker }
            >
                <Picker.Item label="Não Lúcido" value="1" />
                <Picker.Item label="Parcialmente Lúcido" value="2" />
                <Picker.Item label="Lúcido" value="3" />
                <Picker.Item label="Indefinido" value="4" />
            </Picker>
            <Picker
                selectedValue={ dream.dreamTypeId }
                onValueChange={ (e) => setDream({
                    ...dream,
                    dreamTypeId: e
                })}
                style={ styles.dreamPointOfViewPicker }
            >
                <Picker.Item label="Sonho" value="1" />
                <Picker.Item label="Pesadelo" value="2" />
                <Picker.Item label="Indefinido" value="3" />
            </Picker>
            <Picker
                selectedValue={ dream.dreamRealityLevelId }
                onValueChange={ (e) => setDream({
                    ...dream,
                    dreamRealityLevelId: e
                })}
                style={ styles.dreamPointOfViewPicker }
            >
                <Picker.Item label="Irreal" value="1" />
                <Picker.Item label="Parcialmente Real" value="2" />
                <Picker.Item label="Real" value="3" />
            </Picker>
            <CustomSwitch
                label="Sonho Erótico"
                value={ dream.eroticDream }
                onChange={ (e) => { setDream({
                    ...dream,
                    eroticDream: e
                })}}
            />
            <CustomSwitch
                label="Sonho Oculto"
                value={ dream.hiddenDream }
                onChange={ (e) => { setDream({
                    ...dream,
                    hiddenDream: e
                })}}
            />
            <CustomInput
                label="Análise Pessoal"
                onChange={ (e) => setDream({ ...dream, personalAnalysis: e }) }
            />
            <View>
                <View>
                    <CustomInput
                        label="Adicionar Tag"
                        onChange={ (e) => setTag(e.toUpperCase().trim()) }
                        innerProps={{ value: tag }}
                    />
                    <CustomButton
                        title="Adicionar"
                        onPress={ appendTag }
                    />
                </View>
                <View>
                    {
                        dream.tags.map((tag, i) => {
                            return <Pressable
                                onPress={ () => removeTag(tag) }
                                key={ i }
                            >
                                <Text>{ tag }</Text>
                            </Pressable>
                        })
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    dreamPointOfViewPicker: {
        width: 395
    },
})