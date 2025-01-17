import countries from 'world-countries'
import { countryT } from '@/lib/types'
import { useCallback } from 'react'

const formattedCountries: countryT[] = countries.map((c) => ({
    value: c.cca2,
    label: c.name.common,
    flag: c.flag,
    latlng: c.latlng,
    region: c.region,
}))

const useCountries = () => {
    const getCountryByVal = useCallback(
        (val: string) => formattedCountries.find((c) => c.value == val),
        []
    )

    return { countries: formattedCountries, getCountryByVal }
}

export default useCountries
