import { z } from 'zod'
import { listingSchema } from './zodSchemas'
import type { LucideIcon } from 'lucide-react'
import { listingTable, reservationTable, userTable } from '@/drizzle/schema'

export type createListingT = z.infer<typeof listingSchema>
export type unsafeCreateListingT = Partial<createListingT>

export type createListingFieldT = keyof createListingT
export type createListingValueT = createListingT[createListingFieldT]
export type createListingFormStepT = { [k in STEPS]: createListingFieldT[] }

export type viewUserT = typeof userTable.$inferSelect

export type viewReservationT = typeof reservationTable.$inferSelect

export type viewListingT = typeof listingTable.$inferSelect
export type viewListingReservationT = viewListingT & {
    isFavorite?: boolean
    reservation?: viewReservationT
}
export type viewListingDetailT = viewListingReservationT & {
    user: viewUserT
    reservations: viewReservationT[]
}

export type filterListingT = Partial<
    Pick<
        viewListingT,
        'category' | 'bathroomCount' | 'roomCount' | 'guestCount' | 'location'
    >
> &
    Partial<{ user: boolean; favorite: boolean }>

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
