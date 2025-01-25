import Heading from '@/components/layout/Heading'
import ListingGrid from '@/components/listing/view/ListingGrid'
import { getAllReservationAction } from '@/lib/actions/listingAction'
import React from 'react'

const MyReservations = async () => {
    const listings = await getAllReservationAction()

    if (listings.length == 0)
        return (
            <div className="m-auto">
                <Heading
                    title="No reservations found"
                    subtitle="All reservations will appear here"
                    center
                />
            </div>
        )

    return <ListingGrid listings={listings} />
}

export default MyReservations
