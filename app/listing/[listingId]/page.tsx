import ListingHeader from '@/components/listing/view/ListingHeader'
import ListingInfo from '@/components/listing/view/ListingInfo'
import ListingReservation from '@/components/listing/view/ListingReservation'
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
        <div className="flex flex-col gap-4 p-6">
            <ListingHeader listing={listing} user={user!} />

            <div className="grid grid-cols-1 md:grid-cols-7 md:gap-4">
                <ListingInfo listing={listing} />

                <div className="order-first col-span-1 md:order-last md:col-span-3">
                    <ListingReservation listing={listing} />
                </div>
            </div>
        </div>
    )
}

export default ListingDetail
