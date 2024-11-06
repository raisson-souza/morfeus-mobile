export type RegistryCredentials = {
    passwordRepeat?: string
} & RegistryRequest

export type RegistryRequest = {
    fullName?: string
    email?: string
    password?: string
}

export type RegistryResponse = string