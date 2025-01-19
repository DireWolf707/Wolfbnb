import React from 'react'
import { filterListingT, viewListingT } from '@/lib/types'
import { getAllListingAction } from '@/lib/actions/listingAction'
import EmptyView from '@/components/listing/view/EmptyView'
import ListingCard from './ListingCard'

const SearchList = async ({
    searchParams,
}: {
    searchParams: Promise<filterListingT>
}) => {
    const filters = await searchParams
    const listings: viewListingT[] = await getAllListingAction(filters)

    if (listings.length == 0) return <EmptyView />

    return (
        <div className="grid grid-cols-1 gap-8 overflow-y-auto px-12 pb-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
            ))}
        </div>
    )
}

export default SearchList
