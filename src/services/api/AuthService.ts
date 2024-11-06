import { LoginResponse } from "../../types/login"
import { RegistryCredentials, RegistryResponse } from "../../types/registry"
import Endpoints from "./base/Endpoints"

export default abstract class ServiceExample extends Endpoints {
    static async Registry(body: RegistryCredentials) {
        return await this.Post<RegistryResponse>({
            url: "/users",
            body: body
        })
    }

    static async Login(body: any) {
        return await this.Post<LoginResponse>({
            url: "/users/login",
            body: body
        })
    }
}