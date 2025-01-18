'use server'
import db from '@/drizzle/client'
import storage from '@/uploadThing/client'
import { listingTable } from '@/drizzle/schema'
import { createListingT } from '../types'
import { listingSchema } from '../zodSchemas'
import { auth } from '@/auth'
import { desc } from 'drizzle-orm'

export const createListingAction = async (_data: createListingT) => {
    const session = await auth()
    const data = listingSchema.parse(_data)

    const image = (await storage.uploadFiles(data.image)).data?.url
    if (!image) throw new Error('Something went wrong!')

    return await db
        .insert(listingTable)
        .values({ ...data, image, userId: session!.user!.id! })
        .returning()
}

export const getAllListingAction = async () => {
    return await db
        .select()
        .from(listingTable)
        .orderBy(desc(listingTable.createdAt))
}
