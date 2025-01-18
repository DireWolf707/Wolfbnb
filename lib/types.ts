import { z } from 'zod'
import { listingSchema, unsafeListingSchema } from './zodSchemas'
import type { LucideIcon } from 'lucide-react'
import { listingTable } from '@/drizzle/schema'

export type createListingT = z.infer<typeof listingSchema>
export type unsafeCreateListingT = z.infer<typeof unsafeListingSchema>

export type createListingFieldT = keyof createListingT
export type createListingValueT = createListingT[createListingFieldT]
export type createListingFormStepT = { [k in STEPS]: createListingFieldT[] }

export type viewListingT = typeof listingTable.$inferSelect

export const categoryEnumArray = [
    'Beach',
    'Windmills',
    'Modern',
    'Countryside',
    'Pools',
    'Islands',
    'Lake',
    'Skiing',
    'Castles',
    'Caves',
    'Camping',
    'Arctic',
    'Desert',
    'Barns',
    'Lux',
] as const

export type categortyT = (typeof categoryEnumArray)[number]

export type categortyListT = {
    label: categortyT
    Icon: LucideIcon
    description: string
}

export enum STEPS {
    CATEGORY,
    LOCATION,
    INFO,
    IMAGE,
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

export type MyFile = File & { preview?: string }
