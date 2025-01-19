import { z } from 'zod'
import { categoryEnumArray } from './types'
import { MAX_FILESIZE } from './constants'

export const listingSchema = z.object({
    category: z.enum(categoryEnumArray),
    location: z.string().trim(),
    title: z.string().trim(),
    image: z
        .instanceof(File, { message: 'Image not selected' })
        .refine((file) => {
            return file.type.startsWith('image/')
        }, 'File must be a image')
        .refine((file) => {
            return !file || file.size <= MAX_FILESIZE
        }, 'Image size must be less than 3MB'),
    description: z.string().trim().min(1, { message: 'Required' }),
    guestCount: z.number().min(1),
    roomCount: z.number().min(1),
    bathroomCount: z.number().min(1),
    price: z.number().min(1),
})
