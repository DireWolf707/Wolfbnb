'use client'
import Avatar from '@/components/layout/Avatar'
import { categories } from '@/lib/constants'
import useCountries from '@/lib/hooks/useCountries'
import { viewListingDetailT } from '@/lib/types'
import dynamic from 'next/dynamic'
import React, { useMemo } from 'react'

const ListingInfo = ({ listing }: { listing: viewListingDetailT }) => {
    const { getCountryByVal } = useCountries()

    const { label, Icon, description } = useMemo(
        () => categories.find((c) => c.label == listing.category)!,
        [listing.category]
    )

    const location = useMemo(
        () => getCountryByVal(listing.location),
        [getCountryByVal, listing.location]
    )

    const Map = useMemo(
        () =>
            dynamic(() => import('../create/Map'), {
                ssr: false,
            }),
        []
    )

    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xl font-semibold">
                    <div className="flex gap-1">
                        <span>Hosted By</span>
                        <span className="text-rose-500">
                            {listing.user.name}
                        </span>
                    </div>
                    <Avatar user={listing.user} />
                </div>

                <div className="flex items-center gap-4 font-semibold text-neutral-400">
                    <span>{listing.guestCount} guests</span>
                    <span>{listing.roomCount} rooms</span>
                    <span>{listing.bathroomCount} bathrooms</span>
                </div>
            </div>

            <hr />

            <div className="flex items-center gap-2">
                <Icon className="size-8 text-rose-500" />

                <div className="flex flex-col">
                    <span className="text-lg font-bold text-rose-500">
                        {label}
                    </span>
                    <span className="text-sm font-extrabold text-neutral-300">
                        {description}
                    </span>
                </div>
            </div>

            <hr />

            <div className="text-lg font-light text-neutral-200">
                {listing.description}
            </div>

            <hr />

            <Map center={location?.latlng} />
        </div>
    )
}

export default ListingInfo
