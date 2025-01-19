'use client'
import { cn } from '@/lib/utils'
import { HeartIcon } from 'lucide-react'
import React, { useState } from 'react'

const FavoriteButton = ({ listingId }: { listingId: string }) => {
    const [isFavorite, setIsFavorite] = useState(false)

    return (
        <HeartIcon
            onClick={() => setIsFavorite((prev) => !prev)}
            className={cn('cursor-pointer', isFavorite && 'fill-rose-600')}
        />
    )
}

export default FavoriteButton
