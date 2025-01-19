'use server'
import db from '@/drizzle/client'
import storage from '@/uploadThing/client'
import { listingTable } from '@/drizzle/schema'
import { createListingT, filterListingT } from '../types'
import { listingSchema } from '../zodSchemas'
import { auth } from '@/auth'
import { and, desc, eq, SQL } from 'drizzle-orm'

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

export const getAllListingAction = async (filters: filterListingT) => {
    const conditions: SQL[] = []

    if (filters.category)
        conditions.push(eq(listingTable.category, filters.category))

    return await db
        .select()
        .from(listingTable)
        .where(and(...conditions))
        .orderBy(desc(listingTable.createdAt))
}
