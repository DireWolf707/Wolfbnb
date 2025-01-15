import { z } from 'zod'
import { postSchema } from './zodSchemas'

export type postT = z.infer<typeof postSchema>
