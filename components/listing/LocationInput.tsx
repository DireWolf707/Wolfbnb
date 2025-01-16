'use client'
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import countries from 'world-countries'
import { countryT } from '@/lib/types'

const formattedCountries: countryT[] = countries.map((c) => ({
    value: c.cca2,
    label: c.name.common,
    flag: c.flag,
    latlng: c.latlng,
    region: c.region,
}))

const LocationInput = ({
    value,
    onClick,
}: {
    value: string
    onClick: (val: string) => void
}) => {
    return (
        <Select value={value} onValueChange={onClick}>
            <SelectTrigger>
                <SelectValue placeholder="Select country" />
            </SelectTrigger>

            <SelectContent>
                {formattedCountries.map((val) => (
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
    )
}

export default LocationInput
