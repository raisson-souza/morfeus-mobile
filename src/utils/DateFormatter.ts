export const DateFormatter = {
    /** @example "2024-11-01T00:00:00.000Z" > "2024-11-01" */
    removeTime: (date: string) => {
        return date.split("T")[0]
    }
}