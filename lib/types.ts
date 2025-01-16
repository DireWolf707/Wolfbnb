import { z } from 'zod'
import { listingSchema, unsafeListingSchema } from './zodSchemas'
import type { LucideIcon } from 'lucide-react'

export type listingT = z.infer<typeof listingSchema>
export type unsafeListingT = z.infer<typeof unsafeListingSchema>

export enum CATEGORY {
    Beach = 'Beach',
    Windmills = 'Windmills',
    Modern = 'Modern',
    Countryside = 'Countryside',
    Pools = 'Pools',
    Islands = 'Islands',
    Lake = 'Lake',
    Skiing = 'Skiing',
    Castles = 'Castles',
    Caves = 'Caves',
    Camping = 'Camping',
    Arctic = 'Arctic',
    Desert = 'Desert',
    Barns = 'Barns',
    Lux = 'Lux',
}

export type categortyT = {
    label: CATEGORY
    Icon: LucideIcon
    description: string
}

export enum STEPS {
    CATEGORY,
    LOCATION,
    INFO,
    IMAGES,
    DESCRIPTION,
    PRICE,
}

export type countryT = {
    value: string
    label: string
    flag: string
    latlng: [number, number]
    region: string
}
