import AsyncStorage from '@react-native-async-storage/async-storage'
import isNil from './IsNill'

/**
 * Tipo de credenciais aceitas na autenticação
 * // TODO: alterar se necessário
*/
export type LocalStorageCredentials = {
    email: string
    password: string
}

export type LocalStorageToken = {
    token: string
    tokenExpirationDateMilis: number
}

/** Tipo com funções específicas para propriedades do local storage */
type LocalStorageDefiners<T> = {
    get: () => Promise<T | null>
    set: (value: T) => Promise<void>
    remove: () => Promise<void>
}

type LocalStorageProps = {
    /** Token de autenticação da API */
    tokenInfo: LocalStorageDefiners<LocalStorageToken>
    /** Credenciais de login do usuário */
    loginCredentials: LocalStorageDefiners<LocalStorageCredentials>
    /** Ações no AsyncStorage quando login */
    login: (tokenInfo: LocalStorageToken, credentials: LocalStorageCredentials) => Promise<void>
    /** Ações no AsyncStorage quando logoff */
    logoff: () => Promise<void>
}

export const LocalStorage: LocalStorageProps = {
    tokenInfo: {
        async get() {
            const apiToken = await AsyncStorage.getItem("api_token")
            const apiTokenExpiration = Number.parseInt(await AsyncStorage.getItem("api_token_expiration") ?? new Date().getTime().toString())
            if (!apiToken || !apiTokenExpiration ) return null
            return {
                token: apiToken,
                tokenExpirationDateMilis: apiTokenExpiration
            }
        },
        async set(value) {
            await AsyncStorage.setItem("api_token", value.token)
            await AsyncStorage.setItem("api_token_expiration", value.tokenExpirationDateMilis.toString())
        },
        async remove() {
            await AsyncStorage.removeItem("api_token")
            await AsyncStorage.removeItem("api_token_expiration")
        },
    },
    loginCredentials: {
        async get() {
            return !isNil(await AsyncStorage.getItem("credentials"))
                ? JSON.parse(await AsyncStorage.getItem("credentials") ?? "") as LocalStorageCredentials 
                : null
        },
        async set(value) {
            await AsyncStorage.setItem("credentials", JSON.stringify(value))
        },
        async remove() {
            await AsyncStorage.removeItem("credentials")
        },
    },
    async login(tokenInfo, credentials) {
        await LocalStorage.loginCredentials.set(credentials)
        await LocalStorage.tokenInfo.set(tokenInfo)
    },
    async logoff() {
        await LocalStorage.loginCredentials.remove()
        await LocalStorage.tokenInfo.remove()
    },
}