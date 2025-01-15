import { loadEnvConfig } from '@next/env'
import { defineConfig } from 'drizzle-kit'

loadEnvConfig(process.cwd())

if (!process.env.DATABASE_URL)
    throw new Error('DATABASE_URL must be a Neon postgres connection string')

export default defineConfig({
    out: './drizzle',
    schema: './drizzle/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
})
