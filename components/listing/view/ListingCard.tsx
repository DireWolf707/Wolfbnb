import { viewListingReservationT } from '@/lib/types'
import React, { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import FavoriteButton from './FavoriteButton'
import useCountries from '@/lib/hooks/useCountries'
import { User } from 'next-auth'
import ListingActionButton from './ListingActionButton'
import { format } from 'date-fns'

const ListingCard = ({
    listing,
    user,
}: {
    listing: viewListingReservationT
    user?: User
}) => {
    const { getCountryByVal } = useCountries()

    const location = useMemo(
        () => getCountryByVal(listing.location),
        [getCountryByVal, listing.location]
    )

    const reservationDate = useMemo(() => {
        if (!listing.reservation) return null

        return `${format(listing.reservation.startDate, 'PP')} - ${format(listing.reservation.endDate, 'PP')}`
    }, [listing.reservation])

    return (
        <div className="flex flex-col gap-2">
            <div className="relative overflow-hidden rounded-xl">
                <Link href={'/listing/' + listing.id} className="group ">
                    <Image
                        height={200}
                        width={200}
                        alt={listing.title}
                        src={listing.image}
                        className="aspect-square size-full rounded-xl object-cover transition group-hover:scale-110"
                    />
                </Link>

                <div className="absolute right-3 top-3">
                    <FavoriteButton
                        user={user}
                        listingId={listing.id}
                        _isFavorite={!!listing.isFavorite}
                    />
                </div>
            </div>

            <div className="flex flex-col">
                <span className="font-semibold">
                    {location?.region}, {location?.label}
                </span>

                {
                    <span className="text-sm font-semibold text-neutral-400">
                        {listing.reservation
                            ? reservationDate
                            : listing.category}
                    </span>
                }

                <div className="flex items-center gap-1 text-sm font-bold">
                    {listing.reservation ? (
                        <span className="text-red-500">
                            ${listing.reservation.price}
                        </span>
                    ) : (
                        <>
                            <span className="text-red-500">
                                ${listing.price}
                            </span>
                            <span>per night</span>
                        </>
                    )}
                </div>
            </div>

            <ListingActionButton
                listingId={listing.id}
                reservationId={listing.reservation?.id}
            />
        </div>
    )
}

export default ListingCard
