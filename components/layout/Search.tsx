import React from 'react'
import { SearchIcon } from 'lucide-react'

const Search = () => {
    return (
        <div className="flex flex-1 items-center justify-between rounded-full border-2 p-2 md:flex-none md:justify-normal">
            <div className="px-2 text-sm font-semibold">Anywhere</div>
            <div className="hidden px-2 text-sm font-semibold sm:block md:border-x-2">
                Any Week
            </div>
            <div className="flex items-center gap-2 pl-2 pr-1">
                <div className="hidden text-sm font-semibold text-gray-500 sm:block">
                    Add Guests
                </div>

                <SearchIcon className="size-[24px] rounded-full bg-rose-600 p-[4px]" />
            </div>
        </div>
    )
}

export default Search
