import ListingHeader from '@/components/listing/view/ListingHeader'
import ListingInfo from '@/components/listing/view/ListingInfo'
import { getListingDetail } from '@/lib/actions/listingAction'
import { getUser } from '@/lib/serverUtils'
import React from 'react'

const ListingDetail = async ({
    params,
}: {
    params: Promise<{ listingId: string }>
}) => {
    const { listingId } = await params
    const listing = await getListingDetail(listingId)
    const user = await getUser()

    return (
        <div className="flex flex-col gap-4 px-12 py-6">
            <ListingHeader listing={listing} user={user!} />

            <div className="grid grid-cols-1 md:grid-cols-7">
                <ListingInfo listing={listing} />
            </div>
        </div>
    )
}

export default ListingDetail
