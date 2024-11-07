import { LoginRequest } from "./login"

export type LoginRefreshRequest = {
    apiToken?: string
} & LoginRequest

export type LoginRefreshResponse = string