import { viewListingT } from '@/lib/types'
import React, { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import FavoriteButton from './FavoriteButton'
import useCountries from '@/lib/hooks/useCountries'

const ListingCard = ({ listing }: { listing: viewListingT }) => {
    const { getCountryByVal } = useCountries()

    const location = useMemo(
        () => getCountryByVal(listing.location),
        [getCountryByVal, listing.location]
    )

    // const price = useMemo(
    //     () => (reservation ? reservation.price : listing.price),
    //     [reservation, listing.price]
    // )

    // const reservationDate = useMemo(() => {
    //     if (!reservation) return null

    //     return `${format(reservation.startDate, 'PP')} - ${format(reservation.endDate, 'PP')}`
    // }, [reservation])

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
                    <FavoriteButton listingId={listing.id} />
                </div>
            </div>

            <div className="flex flex-col">
                <span className="font-semibold">
                    {location?.region}, {location?.label}
                </span>

                <span className="text-sm font-semibold text-neutral-400">
                    {listing.category}
                </span>

                <span className="text-sm font-bold">
                    {listing.price}$ per night
                </span>
            </div>
        </div>
    )
}

export default ListingCard
