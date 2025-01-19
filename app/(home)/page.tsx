import React, { Suspense } from 'react'
import Categories from '@/components/layout/Categories'
import SearchList from '@/components/listing/view/SearchList'
import { filterListingT } from '@/lib/types'
import Spinner from '@/components/loading/Spinner'

const Home = ({ searchParams }: { searchParams: Promise<filterListingT> }) => {
    return (
        <div className="flex grow flex-col overflow-y-auto">
            <Categories />

            <Suspense fallback={<Spinner />}>
                <SearchList searchParams={searchParams} />
            </Suspense>
        </div>
    )
}

export default Home
