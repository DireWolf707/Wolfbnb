'use server'
import db from '@/drizzle/client'
import storage from '@/uploadThing/client'
import {
    favouriteTable,
    listingTable,
    reservationTable,
    userTable,
} from '@/drizzle/schema'
import {
    createListingT,
    filterListingT,
    viewListingDetailT,
    viewListingWithFavoriteT,
    viewReservationT,
} from '../types'
import { listingSchema } from '../zodSchemas'
import { and, desc, eq, getTableColumns, gte, sql, SQL } from 'drizzle-orm'
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

    let result: viewListingWithFavoriteT[]
    if (!user)
        result = await db
            .select()
            .from(listingTable)
            .where(and(...conditions))
            .orderBy(desc(listingTable.createdAt))
    else
        result = await db
            .select({
                ...getTableColumns(listingTable),
                isFavorite: sql<boolean>`
                    COALESCE(${favouriteTable.listingId} IS NOT NULL, FALSE)
                `,
            })
            .from(listingTable)
            .where(and(...conditions))
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

    const result: viewListingWithFavoriteT[] = await db
        .select({
            ...getTableColumns(listingTable),
            isFavorite: sql<boolean>`
                COALESCE(${favouriteTable.listingId} IS NOT NULL, FALSE)
            `,
        })
        .from(listingTable)
        .where(eq(favouriteTable.userId, user!.id!))
        .innerJoin(
            favouriteTable,
            eq(listingTable.id, favouriteTable.listingId)
        )

    return result
}

export const getListingDetail = async (listingId: string) => {
    if (!listingId) throw new Error('Listing id is missing!')

    const user = await getUser()

    const result: viewListingDetailT[] = await db
        .select({
            ...getTableColumns(listingTable),
            user: userTable,
            isFavorite: sql<boolean>`
                COALESCE(${favouriteTable.listingId} IS NOT NULL, FALSE)
            `,
            reservations: sql<viewReservationT[]>`COALESCE(
                json_agg(${reservationTable})
                FILTER (WHERE ${reservationTable.id} IS NOT NULL),
                '[]'
            )`,
        })
        .from(listingTable)
        .innerJoin(
            userTable,
            and(
                eq(listingTable.id, listingId),
                eq(listingTable.userId, userTable.id)
            )
        )
        .leftJoin(
            favouriteTable,
            and(
                eq(listingTable.id, favouriteTable.listingId),
                eq(favouriteTable.userId, user!.id!)
            )
        )
        .leftJoin(
            reservationTable,
            and(
                eq(listingTable.id, reservationTable.listingId),
                gte(reservationTable.startDate, new Date())
            )
        )
        .groupBy(
            listingTable.id,
            favouriteTable.userId,
            favouriteTable.listingId,
            userTable.id
        )

    return result[0]
}
