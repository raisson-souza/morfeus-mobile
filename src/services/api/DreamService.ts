import { ListDreamByUserResponse, ListDreamsByUserRequest } from "../../types/dream"
import Endpoints from "./base/Endpoints"

export default abstract class DreamService extends Endpoints {
    static async Create() {

    }

    static async CreateUncomplete() {
        
    }

    static async Update() {
        
    }

    static async GetDream() {
        
    }

    static async DeleteDream() {
        
    }

    static async ListByUser(online: boolean, body: ListDreamsByUserRequest) {
        return await this.Post<ListDreamByUserResponse>({
            url: "/users/dreams/list",
            authorization: await this.GetAuthorization(),
            body: body
        })
    }

    static async ListBySleep() {
        
    }
}