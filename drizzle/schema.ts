import { categoryEnumArray } from '@/lib/types'
import {
    pgTable,
    timestamp,
    text,
    primaryKey,
    integer,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core'
import type { AdapterAccountType } from 'next-auth/adapters'

export const userTable = pgTable('user', {
    id: uuid().primaryKey().defaultRandom(),
    name: text(),
    email: text().unique(),
    emailVerified: timestamp({ mode: 'date' }),
    image: text(),
})

export const listingTable = pgTable('listing', {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid()
        .notNull()
        .references(() => userTable.id, { onDelete: 'cascade' }),
    title: text(),
    description: text(),
    image: text(),
    createdAt: timestamp().defaultNow(),
    category: varchar({
        length: 20,
        enum: categoryEnumArray,
    }),
    roomCount: integer(),
    bathroomCount: integer(),
    guestCount: integer(),
    location: text(),
    price: integer(),
})

export const favouriteTable = pgTable(
    'favorite',
    {
        userId: uuid()
            .notNull()
            .references(() => userTable.id, { onDelete: 'cascade' }),
        listingId: uuid()
            .notNull()
            .references(() => listingTable.id, {
                onDelete: 'cascade',
            }),
    },
    (favouriteTable) => [
        primaryKey({
            columns: [favouriteTable.userId, favouriteTable.listingId],
        }),
    ]
)

export const reservationTable = pgTable('reservation', {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid()
        .notNull()
        .references(() => userTable.id, { onDelete: 'cascade' }),
    listingId: uuid()
        .notNull()
        .references(() => listingTable.id, {
            onDelete: 'cascade',
        }),
    startDate: timestamp({ mode: 'date' }),
    endDate: timestamp({ mode: 'date' }),
    createdAt: timestamp().defaultNow(),
})

export const accountTable = pgTable(
    'account',
    {
        userId: uuid('userId')
            .notNull()
            .references(() => userTable.id, { onDelete: 'cascade' }),
        type: text('type').$type<AdapterAccountType>().notNull(),
        provider: text('provider').notNull(),
        providerAccountId: text('providerAccountId').notNull(),
        refresh_token: text('refresh_token'),
        access_token: text('access_token'),
        expires_at: integer('expires_at'),
        token_type: text('token_type'),
        scope: text('scope'),
        id_token: text('id_token'),
        session_state: text('session_state'),
    },
    (accountTable) => [
        primaryKey({
            columns: [accountTable.provider, accountTable.providerAccountId],
        }),
    ]
)
