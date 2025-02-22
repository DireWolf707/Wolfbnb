import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
// import GitHub from 'next-auth/providers/github'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import db from './drizzle/client'
import { userTable, accountTable } from './drizzle/schema'

export const { handlers, signIn, signOut, auth } = NextAuth({
    trustHost: true,
    adapter: DrizzleAdapter(db, {
        usersTable: userTable,
        accountsTable: accountTable,
    }),
    providers: [
        Google,
        //  GitHub
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) token.id = user.id
            return token
        },
        session({ session, token }) {
            session.user.id = token.id as string
            return session
        },
    },
})
