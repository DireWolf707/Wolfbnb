import React from 'react'
import ListingCard from './ListingCard'
import { getUser } from '@/lib/serverUtils'
import { viewListingWithFavoriteT } from '@/lib/types'

const ListingGrid = async ({
    listings,
}: {
    listings: viewListingWithFavoriteT[]
}) => {
    const user = await getUser(false)

    return (
        <div className="grid grid-cols-1 gap-8 overflow-y-auto p-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} user={user} />
            ))}
        </div>
    )
}

export default ListingGrid
