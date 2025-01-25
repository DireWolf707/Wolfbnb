import Heading from '@/components/layout/Heading'
import ListingGrid from '@/components/listing/view/ListingGrid'
import { getAllListingAction } from '@/lib/actions/listingAction'
import React from 'react'

const MyProperties = async () => {
    const listings = await getAllListingAction({ user: true })

    if (listings.length == 0)
        return (
            <div className="m-auto">
                <Heading
                    title="No properties found"
                    subtitle="All properties will appear here"
                    center
                />
            </div>
        )

    return <ListingGrid listings={listings} />
}

export default MyProperties
