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
			ameno: boolean
			calor: boolean
			garoa: boolean
			chuva: boolean
			tempestade: boolean
			nevoa: boolean
			neve: boolean
			multiplos: boolean
			outro: boolean
			indefinido: boolean
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