'use server'
import db from '@/drizzle/client'
import storage from '@/uploadThing/client'
import { favouriteTable, listingTable } from '@/drizzle/schema'
import {
    createListingT,
    filterListingT,
    viewListingWithFavoriteT,
} from '../types'
import { listingSchema } from '../zodSchemas'
import { and, desc, eq, getTableColumns, SQL } from 'drizzle-orm'
import { getUser } from '../serverUtils'

export const createListingAction = async (_data: createListingT) => {
    const user = await getUser()
    const data = listingSchema.parse(_data)

    const image = (await storage.uploadFiles(data.image)).data?.url
    if (!image) throw new Error('Something went wrong!')

    const result = await db
        .insert(listingTable)
        .values({ ...data, image, userId: user!.id! })
        .returning()

    return result
}

export const getAllListingAction = async (filters: filterListingT) => {
    const user = await getUser(false)

    const conditions: SQL[] = []

    if (filters.category)
        conditions.push(eq(listingTable.category, filters.category))

    const sq = db
        .select()
        .from(listingTable)
        .where(and(...conditions))
        .as('listing')

    let result: viewListingWithFavoriteT[]
    if (!user)
        result = await db
            .select()
            .from(sq)
            .orderBy(desc(listingTable.createdAt))
    else
        result = await db
            .select({
                ...getTableColumns(listingTable),
                isFavorite: favouriteTable,
            })
            .from(sq)
            .leftJoin(
                favouriteTable,
                and(
                    eq(listingTable.id, favouriteTable.listingId),
                    eq(listingTable.userId, user.id!)
                )
            )
            .orderBy(desc(listingTable.createdAt))

    return result
}

export const favoriteListingAction = async (listingId: string) => {
    if (!listingId) throw new Error('Listing id is missing!')

    const user = await getUser()

    await db
        .insert(favouriteTable)
        .values({
            listingId,
            userId: user!.id!,
        })
        .onConflictDoNothing()
}

export const unfavoriteListingAction = async (listingId: string) => {
    if (!listingId) throw new Error('Listing id is missing!')

    const user = await getUser()

    await db
        .delete(favouriteTable)
        .where(
            and(
                eq(favouriteTable.userId, user!.id!),
                eq(favouriteTable.listingId, listingId)
            )
        )
}

export const getAllFavoriteListingAction = async () => {
    const user = await getUser()

    const sq = db
        .select()
        .from(favouriteTable)
        .where(eq(favouriteTable.userId, user!.id!))
        .as('favorite')

    const result: viewListingWithFavoriteT[] = await db
        .select({
            ...getTableColumns(listingTable),
            isFavorite: favouriteTable,
        })
        .from(sq)
        .innerJoin(listingTable, eq(listingTable.id, sq.listingId))

    return result
}
