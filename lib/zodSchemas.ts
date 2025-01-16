import { z } from 'zod'
import { CATEGORY } from './types'

export const listingSchema = z.object({
    category: z.enum(Object.values(CATEGORY) as [string, ...string[]]),
    location: z.string(),
    title: z.string(),
    imageSrc: z.string(),
    description: z.string(),
    guestCount: z.number(),
    roomCount: z.number(),
    bathroomCount: z.number(),
    price: z.number(),
})
export const unsafeListingSchema = listingSchema.partial()
