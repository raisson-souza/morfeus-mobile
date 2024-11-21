export type SimpleSleepModel = {
    sleepStart: Date
	sleepEnd: Date
	date: Date
}

export type CreateSimpleSleepRequest = {
    sleepStartYesterday: string
	sleepEndToday: string
	date: string
}

export type CreateSimpleSleepResponse = string

export type GetSimpleSleepResponse = {
    sleepEnd: Date | null
    sleepStart: Date | null
}
