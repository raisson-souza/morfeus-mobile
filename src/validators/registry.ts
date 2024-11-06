import { z } from "./base/validator"

export const registryValidator = z.object({
    email: z.string().email(),
    password: z.string().trim()
})