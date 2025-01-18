import { UTApi } from 'uploadthing/server'

if (!process.env.DATABASE_URL) throw new Error('UPLOADTHING_TOKEN must be set')

const storage = new UTApi({
    token: process.env.UPLOADTHING_TOKEN,
})

export default storage
