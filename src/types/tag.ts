export type TagModel = {
    title: string
    id: number
}

export type ListTagByDreamRequest = {
    dreamId: number
}

export type ListTagByDreamResponse = TagModel[]