'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { Range } from 'react-date-range'
import Calendar from './Calendar'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'
import { viewListingDetailT } from '@/lib/types'
import { useCreateReservation } from '@/lib/hooks/listingHook'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const initialDateRange: Range = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
}

const ListingReservation = ({ listing }: { listing: viewListingDetailT }) => {
    const [totalPrice, setTotalPrice] = useState(listing.price)
    const [dateRange, setDateRange] = useState<Range>(initialDateRange)
    const { mutateAsync: createReservation, isPending } = useCreateReservation()

    const disabledDates = useMemo(() => {
        let dates: Date[] = []

        listing.reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate),
            })

            dates = [...dates, ...range]
        })

        return dates
    }, [listing.reservations])

    useEffect(() => {
        const numDays = differenceInCalendarDays(
            dateRange.endDate!,
            dateRange.startDate!
        )

        setTotalPrice(numDays * listing.price)
    }, [dateRange, listing.price])

    return (
        <div className="rounded-xl border-2 border-rose-500">
            <div className="flex items-center gap-1 p-4">
                <span className="text-rose-500">${listing.price}</span>
                <span>per night</span>
            </div>

            <hr />

            <Calendar
                value={dateRange}
                onChange={(val) => setDateRange(val.selection)}
                disabledDates={disabledDates}
            />

            <hr />

            <div className="p-2">
                <Button
                    onClick={() =>
                        toast.promise(
                            createReservation({
                                listingId: listing.id,
                                startDate: dateRange.startDate!,
                                endDate: dateRange.endDate!,
                            }),
                            {
                                loading: 'Creating reservation...',
                                success: () =>
                                    'Reservation created successfully',
                                error: (err) => err.message,
                            }
                        )
                    }
                    disabled={isPending}
                    variant="destructive"
                    className="w-full"
                >
                    Reserve
                </Button>
            </div>

            <hr />

            <div className="flex items-center justify-between p-4 text-lg font-semibold">
                <span>Total</span>

                <span>${totalPrice}</span>
            </div>
        </div>
    )
}

export default ListingReservation
