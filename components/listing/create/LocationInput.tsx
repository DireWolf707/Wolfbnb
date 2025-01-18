'use client'
import React, { useEffect, useMemo, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import useCountries from '@/lib/hooks/useCountries'
import dynamic from 'next/dynamic'

const LocationInput = ({
    value,
    onClick,
}: {
    value: string
    onClick: (val: string) => void
}) => {
    const { countries, getCountryByVal } = useCountries()
    const [center, setCenter] = useState<[number, number] | null>(null)

    useEffect(() => {
        const currCountry = getCountryByVal(value)
        if (!currCountry) return

        setCenter(currCountry.latlng)
    }, [value, getCountryByVal])

    const Map = useMemo(
        () =>
            dynamic(() => import('./Map'), {
                ssr: false,
            }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [center]
    )

    return (
        <>
            <Select value={value} onValueChange={onClick}>
                <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                </SelectTrigger>

                <SelectContent className="z-[9999]">
                    {countries.map((val) => (
                        <SelectItem value={val.value} key={val.value}>
                            <div className="flex items-center gap-3">
                                <div>{val.flag}</div>
                                <div className="font-bold">
                                    {val.label},&nbsp;
                                    <span className="text-sm font-extralight">
                                        {val.region}
                                    </span>
                                </div>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Map center={center} />
        </>
    )
}

export default LocationInput
