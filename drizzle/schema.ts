import { topics } from '@/lib/constants'
import {
    pgTable,
    uuid,
    varchar,
    timestamp,
    text,
    primaryKey,
    integer,
} from 'drizzle-orm/pg-core'
import type { AdapterAccountType } from 'next-auth/adapters'

export const postTable = pgTable('post', {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 50 }).notNull(),
    content: varchar({ length: 50 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    topic: varchar({ length: 20, enum: topics }).notNull(),
})

export const userTable = pgTable('user', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text('name'),
    email: text('email').unique(),
    emailVerified: timestamp('emailVerified', { mode: 'date' }),
    image: text('image'),
})

export const accountTable = pgTable(
    'account',
    {
        userId: text('userId')
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
    (account) => [
        primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    ]
)
