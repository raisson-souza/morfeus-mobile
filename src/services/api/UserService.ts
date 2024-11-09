import { UpdateUserRequest, UpdateUserResponse, UserModel } from "../../types/user"
import Endpoints from "./base/Endpoints"
import Response from "./base/Response"

export default abstract class UserService extends Endpoints {
    static async Update(body: UpdateUserRequest) {
        // return await this.Put<UpdateUserResponse>({
        //     url: "/users",
        //     authorization: await LocalStorage.apiToken.get() ?? ""
        // })
        return {
            Data: "xxxyyyxxxyyy",
            Status: 200,
            Success: true,
            ErrorMessage: undefined
        } as Response<UpdateUserResponse>
    }

    static async GetUser(id: number) {
        return await this.Get<UserModel>({
            url: `/users/${ id }`,
            authorization: await this.GetAuthorization()
        })
    }
}