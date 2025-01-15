'use server'

import db from '@/drizzle/client'
import { postTable } from '@/drizzle/schema'
import { postT } from '../types'
import { postSchema } from '../zodSchemas'
import { desc } from 'drizzle-orm'

export const createPostAction = async (_data: postT) => {
    const data = postSchema.parse(_data)
    return await db.insert(postTable).values(data).returning()
}

export const getPostsAction = async () => {
    return await db.select().from(postTable).orderBy(desc(postTable.createdAt))
}
