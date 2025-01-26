'use client'
import React, { useCallback, useMemo, useState } from 'react'
import { SearchIcon } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import Heading from './Heading'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import LocationInput from '../listing/create/LocationInput'
import NavigationButton from '../listing/create/NavigationButton'
import CounterInput from '../listing/create/CounterInput'
import useCountries from '@/lib/hooks/useCountries'

enum STEPS {
    LOCATION,
    INFO,
}

const initialData = {
    guestCount: 1,
    roomCount: 1,
    bathroomCount: 1,
}

const Search = () => {
    const router = useRouter()
    const params = useSearchParams()
    const { getCountryByVal } = useCountries()

    const [open, setOpen] = useState(false)
    const [step, setStep] = useState(STEPS.LOCATION)
    const [searchData, setSearchData] = useState<{
        guestCount: number
        roomCount: number
        bathroomCount: number
        location?: string
    }>(initialData)

    const onBack = useCallback(
        () =>
            setStep((val) => {
                if (val == 0) return 0
                return val - 1
            }),
        []
    )

    const onNext = useCallback(async () => {
        if (step != STEPS.INFO) setStep((val) => val + 1)
        else {
            const currentQuery = qs.parse(params.toString())
            const { location, ...rest } = searchData

            const newQuery = {
                ...currentQuery,
                ...rest,
                location: location,
            }

            const url = qs.stringifyUrl(
                {
                    url: '/',
                    query: newQuery,
                },
                { skipNull: true }
            )

            setOpen(false)
            setStep(STEPS.LOCATION)
            setSearchData(initialData)

            router.push(url)
        }
    }, [params, router, searchData, step])

    const actionLabel = useMemo(() => {
        if (step == STEPS.INFO) return 'Search'
        return 'Next'
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step == STEPS.LOCATION) return undefined
        return 'Back'
    }, [step])

    const guestLabel = useMemo(() => {
        const guestCount = params.get('guestCount')
        if (guestCount) return `${guestCount} Guests`

        return 'Add Guests'
    }, [params])

    const locationLabel = useMemo(() => {
        const locationVal = params.get('location') as string

        if (locationVal) return getCountryByVal(locationVal)?.label

        return 'Anywhere'
    }, [getCountryByVal, params])

    return (
        <div className="flex flex-1 items-center justify-between rounded-full border-2 p-2 md:flex-none md:justify-normal">
            <div className="px-2 text-sm font-semibold">{locationLabel}</div>

            <div className="flex items-center gap-2 pl-2 pr-1">
                <div className="hidden text-sm font-semibold text-gray-500 sm:block">
                    {guestLabel}
                </div>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger>
                        <SearchIcon className="size-[24px] rounded-full bg-rose-600 p-[4px]" />
                    </DialogTrigger>

                    <DialogContent>
                        <DialogTitle>
                            <Heading title="Filters" center />
                        </DialogTitle>

                        <div className="flex flex-col gap-4">
                            {step == STEPS.LOCATION && (
                                <>
                                    <Heading
                                        title="Where do you wanna go?"
                                        subtitle="Find the perfect location!"
                                    />

                                    <LocationInput
                                        value={searchData.location}
                                        onClick={(location: string) =>
                                            setSearchData((prev) => ({
                                                ...prev,
                                                location,
                                            }))
                                        }
                                    />
                                </>
                            )}

                            {step == STEPS.INFO && (
                                <>
                                    <Heading
                                        title="More information"
                                        subtitle="Find your perfect place!"
                                    />

                                    <div className="flex flex-col gap-4 overflow-auto">
                                        <CounterInput
                                            title="Guests"
                                            subtitle="How many guests do you allow?"
                                            value={searchData.guestCount}
                                            onChange={(guestCount: number) =>
                                                setSearchData((prev) => ({
                                                    ...prev,
                                                    guestCount,
                                                }))
                                            }
                                        />
                                        <hr />
                                        <CounterInput
                                            title="Rooms"
                                            subtitle="How many rooms do you have?"
                                            value={searchData.roomCount}
                                            onChange={(roomCount: number) =>
                                                setSearchData((prev) => ({
                                                    ...prev,
                                                    roomCount,
                                                }))
                                            }
                                        />
                                        <hr />
                                        <CounterInput
                                            title="Bathrooms"
                                            subtitle="How many bathrooms do you have?"
                                            value={searchData.bathroomCount}
                                            onChange={(bathroomCount: number) =>
                                                setSearchData((prev) => ({
                                                    ...prev,
                                                    bathroomCount,
                                                }))
                                            }
                                        />
                                    </div>
                                </>
                            )}

                            <NavigationButton
                                onNext={onNext}
                                onBack={onBack}
                                actionLabel={actionLabel}
                                secondaryActionLabel={secondaryActionLabel}
                            />
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default Search
