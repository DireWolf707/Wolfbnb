'use client'
import Heading from '@/components/layout/Heading'
import useCountries from '@/lib/hooks/useCountries'
import { viewListingDetailT } from '@/lib/types'
import Image from 'next/image'
import React, { useMemo } from 'react'
import FavoriteButton from './FavoriteButton'
import { User } from 'next-auth'

const ListingHeader = ({
    listing,
    user,
}: {
    listing: viewListingDetailT
    user: User
}) => {
    const { getCountryByVal } = useCountries()

    const location = useMemo(
        () => getCountryByVal(listing.location),
        [getCountryByVal, listing.location]
    )

    return (
        <div className="flex flex-col gap-4">
            <Heading
                title={listing.title}
                subtitle={`${location?.region}, ${location?.label}`}
            />

            <div className="relative mx-auto">
                <Image
                    src={listing.image}
                    alt={listing.title}
                    height={640}
                    width={640}
                    className="h-[65vh] w-full rounded-xl object-cover"
                />

                <div className="absolute right-3 top-3">
                    <FavoriteButton
                        user={user}
                        listingId={listing.id}
                        _isFavorite={!!listing.isFavorite}
                    />
                </div>
            </div>
        </div>
    )
}

export default ListingHeader
