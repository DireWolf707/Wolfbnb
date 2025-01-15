import { z } from 'zod'
import { topics } from './constants'

export const postSchema = z.object({
    title: z
        .string()
        .min(2, {
            message: 'Title must be at least 2 characters.',
        })
        .max(50, {
            message: 'Title must not be longer than 50 characters.',
        }),
    content: z
        .string()
        .min(10, {
            message: 'Content must be at least 10 characters.',
        })
        .max(50, {
            message: 'Content must not be longer than 50 characters.',
        }),
    topic: z.enum(topics),
})
