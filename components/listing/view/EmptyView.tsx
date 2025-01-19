'use client'
import Heading from '@/components/layout/Heading'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const EmptyView = () => {
    const router = useRouter()

    return (
        <div className="m-auto flex flex-col items-center gap-8">
            <Heading
                title="No exact matches"
                subtitle="Try changing or removing some of your filters"
                center
            />

            <Button onClick={() => router.push('/')}>Remove all filters</Button>
        </div>
    )
}

export default EmptyView
