import React from 'react'
import { filterListingT } from '@/lib/types'
import { getAllListingAction } from '@/lib/actions/listingAction'
import EmptyView from '@/components/listing/view/EmptyView'
import ListingGrid from './ListingGrid'

const SearchList = async ({
    searchParams,
}: {
    searchParams: Promise<filterListingT>
}) => {
    const filters = await searchParams
    const listings = await getAllListingAction(filters)

    if (listings.length == 0) return <EmptyView />

    return <ListingGrid listings={listings} />
}

export default SearchList
