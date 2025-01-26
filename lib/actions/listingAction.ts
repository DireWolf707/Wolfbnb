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
    viewListingReservationT,
    viewReservationT,
} from '../types'
import { listingSchema } from '../zodSchemas'
import {
    and,
    between,
    desc,
    eq,
    getTableColumns,
    gte,
    sql,
    SQL,
} from 'drizzle-orm'
import { getUser } from '../serverUtils'
import { differenceInCalendarDays } from 'date-fns'

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

export const deleteListingAction = async (listingId: string) => {
    if (!listingId) throw new Error('Listing id is missing!')

    const user = await getUser()

    await db
        .delete(listingTable)
        .where(
            and(
                eq(listingTable.userId, user!.id!),
                eq(listingTable.id, listingId)
            )
        )
}

export const getAllListingAction = async (filters: filterListingT) => {
    const user = await getUser(false)

    const conditions: SQL[] = []

    if (filters.category)
        conditions.push(eq(listingTable.category, filters.category))

    if (filters.user) conditions.push(eq(listingTable.userId, user!.id!))

    if (filters.favorite) conditions.push(eq(favouriteTable.userId, user!.id!))

    if (filters.bathroomCount)
        conditions.push(gte(listingTable.bathroomCount, filters.bathroomCount))

    if (filters.roomCount)
        conditions.push(gte(listingTable.roomCount, filters.roomCount))

    if (filters.guestCount)
        conditions.push(gte(listingTable.guestCount, filters.guestCount))

    if (filters.location)
        conditions.push(eq(listingTable.location, filters.location))

    let result: viewListingReservationT[]
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
                    eq(listingTable.userId, user!.id!)
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

    console.log(result[0].reservations)

    return result[0]
}

export const createReservationAction = async ({
    listingId,
    startDate,
    endDate,
}: {
    listingId?: string
    startDate?: Date
    endDate?: Date
}) => {
    if (!listingId || !startDate || !endDate)
        throw new Error('Data is missing!')
    if (startDate >= endDate) throw new Error('Range is Invalid!')

    const user = await getUser()

    await db.transaction(async (tx) => {
        const reservations = await tx
            .select()
            .from(reservationTable)
            .where(
                and(
                    eq(reservationTable.listingId, listingId),
                    between(reservationTable.endDate, startDate, endDate)
                )
            )

        if (reservations.length != 0)
            throw new Error('Reservation is Unavailable!')

        const [listing] = await tx
            .select()
            .from(listingTable)
            .where(eq(listingTable.id, listingId))

        const numDays = differenceInCalendarDays(endDate, startDate)

        await tx.insert(reservationTable).values({
            listingId,
            userId: user!.id!,
            price: numDays * listing.price,
            startDate,
            endDate,
        })
    })
}

export const getAllReservationAction = async () => {
    const user = await getUser()

    const result: viewListingReservationT[] = await db
        .select({
            ...getTableColumns(listingTable),
            reservation: reservationTable,
            isFavorite: sql<boolean>`
            COALESCE(${favouriteTable.listingId} IS NOT NULL, FALSE)
        `,
        })
        .from(reservationTable)
        .where(eq(reservationTable.userId, user!.id!))
        .innerJoin(
            listingTable,
            eq(reservationTable.listingId, listingTable.id)
        )
        .leftJoin(
            favouriteTable,
            and(
                eq(listingTable.id, favouriteTable.listingId),
                eq(listingTable.userId, user!.id!)
            )
        )
        .orderBy(desc(reservationTable.createdAt))

    return result
}

export const deleteReservationAction = async ({
    reservationId,
    asGuest = false,
}: {
    reservationId: string
    asGuest: boolean
}) => {
    if (!reservationId) throw new Error('Reservation id is missing!')

    const user = await getUser()

    if (asGuest) {
        await db
            .delete(reservationTable)
            .where(
                and(
                    eq(reservationTable.id, reservationId),
                    eq(reservationTable.userId, user!.id!)
                )
            )
    } else {
        await db.transaction(async (tx) => {
            const [listing] = await tx
                .select({
                    ...getTableColumns(listingTable),
                    reservation: reservationTable,
                })
                .from(reservationTable)
                .where(eq(reservationTable.id, reservationId))
                .innerJoin(
                    listingTable,
                    eq(reservationTable.listingId, listingTable.id)
                )

            await tx
                .delete(reservationTable)
                .where(
                    and(
                        eq(reservationTable.id, reservationId),
                        eq(reservationTable.userId, listing.userId)
                    )
                )
        })
    }
}
