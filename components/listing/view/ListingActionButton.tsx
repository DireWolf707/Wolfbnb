'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { useDeleteListing, useDeleteReservation } from '@/lib/hooks/listingHook'
import { toast } from 'sonner'

const ListingActionButton = ({
    listingId,
    reservationId,
}: {
    listingId: string
    reservationId?: string
}) => {
    const path = usePathname()

    const { mutateAsync: deleteListing, isPending: isListingDeleting } =
        useDeleteListing()

    const { mutateAsync: deleteReservation, isPending: isReservationDeleting } =
        useDeleteReservation()

    if (path == '/my-properties')
        return (
            <Button
                variant="destructive"
                disabled={isListingDeleting}
                onClick={() =>
                    toast.promise(() => deleteListing(listingId), {
                        loading: 'Deleting Property',
                        success: 'Property Deleted',
                        error: (err) => err.message,
                    })
                }
            >
                Delete Property
            </Button>
        )

    if (['/my-trips', '/my-reservations'].includes(path) && reservationId)
        return (
            <Button
                variant="destructive"
                disabled={isReservationDeleting}
                onClick={() =>
                    toast.promise(
                        () =>
                            deleteReservation({
                                reservationId,
                                asGuest: path == '/my-trips',
                            }),
                        {
                            loading: 'Cancel Reservation',
                            success: 'Reservation Canceled',
                            error: (err) => err.message,
                        }
                    )
                }
            >
                {path == '/my-trips'
                    ? 'Cancel Reservation'
                    : 'Cancel Guest Reservation'}
            </Button>
        )

    return <></>
}

export default ListingActionButton
