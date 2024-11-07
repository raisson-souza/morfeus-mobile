import { LoginRefreshRequest, LoginRefreshResponse } from "../../types/loginRefresh"
import { LoginRequest, LoginResponse } from "../../types/login"
import { RegistryRequest, RegistryResponse } from "../../types/registry"
import Endpoints from "./base/Endpoints"
import Response from "./base/Response"

export default abstract class AuthService extends Endpoints {
    static async Registry(body: RegistryRequest) {
        // return await this.Post<RegistryResponse>({
        //     url: "/users",
        //     body: body
        // })
        return {
            Data: "Criado com sucesso",
            Status: 200,
            Success: true,
            ErrorMessage: undefined
        } as Response<RegistryResponse>
    }

    static async Login(body: LoginRequest) {
        // return await this.Post<LoginResponse>({
        //     url: "/users/login",
        //     body: body
        // })
        return {
            Data: "xxxyyyxxxyyy",
            Status: 200,
            Success: true,
            ErrorMessage: undefined
        } as Response<LoginResponse>
    }

    static async Refresh(body: LoginRefreshRequest) {
        // return await this.Post<LoginRefreshResponse>({
        //     url: "/users/login/refresh",
        //     body: body
        // })
        return {
            Data: "xxxyyyxxxyyy",
            Status: 200,
            Success: true,
            ErrorMessage: undefined
        } as Response<LoginRefreshResponse>
    }
}