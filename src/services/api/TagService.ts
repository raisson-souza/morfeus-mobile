import { ListTagByDreamRequest, ListTagByDreamResponse } from "../../types/tag"
import Endpoints from "./base/Endpoints"

export default abstract class TagService extends Endpoints {
    static async ListByDream(online: boolean, request: ListTagByDreamRequest) {
        return await this.Get<ListTagByDreamResponse>({
            url: `/tags/list_by_dream?dreamId=${ request.dreamId }`,
            authorization: await this.GetAuthorization()
        })
    }

    static async ListDreamsByTag() {

    }
}