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