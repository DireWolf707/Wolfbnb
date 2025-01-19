import Heading from '@/components/layout/Heading'
import ListingGrid from '@/components/listing/view/ListingGrid'
import { getAllFavoriteListingAction } from '@/lib/actions/listingAction'
import React from 'react'

const FavoriteListing = async () => {
    const listings = await getAllFavoriteListingAction()

    if (listings.length == 0)
        return (
            <div className="m-auto">
                <Heading
                    title="No listing in favorite"
                    subtitle="All favorite property will appear here"
                    center
                />
            </div>
        )

    return <ListingGrid listings={listings} />
}

export default FavoriteListing
