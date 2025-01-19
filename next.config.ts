import type { NextConfig } from 'next'
import { MAX_FILESIZE } from './lib/constants'

const nextConfig: NextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: MAX_FILESIZE,
        },
    },
    images: {
        remotePatterns: [
            { hostname: 'lh3.googleusercontent.com' },
            { hostname: 'avatars.githubusercontent.com' },
            { hostname: 'utfs.io' },
        ],
    },
}

export default nextConfig
