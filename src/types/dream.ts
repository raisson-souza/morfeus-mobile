import { DreamClimateModel } from "./dreamClimate"

export type DreamListedByUserType = {
    id: number
    title: string
    date: string
    tags: {
        id: number
        title: string
    }[]
}

export type ListDreamsByUserRequest = {
    dreamCaracteristicsFilter: "all" | "allNotHidden" | "allNotErotic" | "allNotHiddenAndErotic" | "allHidden" | "allErotic"
	dreamOriginFilter: "all" | "completeDreams" | "fastDreams" | "importedDreams"
	dreamEspecificCaracteristicsFilter: {
		noEspecificy: boolean
		dreamsWithPersonalAnalysis: boolean | null
		dreamClimates: {
			ameno: boolean | null
			calor: boolean | null
			garoa: boolean | null
			chuva: boolean | null
			tempestade: boolean | null
			nevoa: boolean | null
			neve: boolean | null
			multiplos: boolean | null
			outro: boolean | null
			indefinido: boolean | null
		},
		dreamHourId: number | null
		dreamDurationId: number | null
		dreamLucidityLevelId: number | null
		dreamTypeId: number | null
		dreamRealityLevelId: number | null
		dreamPointOfViewId: number | null
	}
	date: string
}

export type ListDreamByUserResponse = DreamListedByUserType[]

export type GetDreamRequest = {
	id: number
}

export type GetDreamResponse = DreamModel

export type DreamModel = {
	id: number
	title: string
	description: string
	climate: DreamClimateModel
	eroticDream: boolean
	hiddenDream: boolean
	personalAnalysis: string | null
	isComplete: boolean
	createdAt: string
	updatedAt: string
	dreamOriginId: number
	dreamPointOfViewId: number
	dreamHourId: number
	dreamDurationId: number
	dreamLucidityLevelId: number
	dreamTypeId: number
	dreamRealityLevelId: number
	sleepId: number
}

export type CompleteDreamModel = {
	title: string
	description: string
	dreamPointOfViewId: number
	climate: DreamClimateModel
	dreamHourId: number
	dreamDurationId: number
	dreamLucidityLevelId: number
	dreamTypeId: number
	dreamRealityLevelId: number
	eroticDream: boolean
	hiddenDream: boolean
	personalAnalysis: string | null
	tags: string[]
}

export type CreateDreamRequest = {
	sleepId: number
} & CompleteDreamModel

export type CreateDreamResponse = string

export type CreateDreamNoSleepRequest = {
	date: string
} & CompleteDreamModel

export type CreateDreamUncompleteRequest = {
	title: string
	description: string
	date: string
	userId: number
	dreamOriginId: number
}
export type CreateDreamUncompleteResponse = string