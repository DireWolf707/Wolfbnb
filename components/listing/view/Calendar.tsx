'use client'
import React from 'react'
import { DateRange, RangeKeyDict, Range } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const Calendar = ({
    value,
    onChange,
    disabledDates,
}: {
    value: Range
    onChange: (val: RangeKeyDict) => void
    disabledDates?: Date[]
}) => {
    return (
        <DateRange
            rangeColors={['#262626']}
            ranges={[value]}
            onChange={onChange}
            showDateDisplay={false}
            minDate={new Date()}
            disabledDates={disabledDates}
        />
    )
}

export default Calendar
