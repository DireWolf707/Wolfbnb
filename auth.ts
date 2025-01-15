import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import db from './drizzle/client'
import { userTable, accountTable } from './drizzle/schema'

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db, {
        usersTable: userTable,
        accountsTable: accountTable,
    }),
    providers: [Google, GitHub],
    session: {
        strategy: 'jwt',
    },
})
