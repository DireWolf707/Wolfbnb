'use client'
import {
    useFavoriteListing,
    useUnfavoriteListing,
} from '@/lib/hooks/listingHook'
import { HeartIcon } from 'lucide-react'
import { User } from 'next-auth'
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'
import { toast } from 'sonner'

const FavoriteButton = ({
    listingId,
    user,
    _isFavorite,
}: {
    listingId: string
    user?: User
    _isFavorite: boolean
}) => {
    const [isFavorite, setIsFavorite] = useState(_isFavorite)

    const { mutateAsync: favorite } = useFavoriteListing()
    const { mutateAsync: unfavorite } = useUnfavoriteListing()

    if (isFavorite)
        return (
            <HeartIcon
                onClick={() =>
                    toast
                        .promise(unfavorite(listingId), {
                            loading: 'Removing from favorite...',
                            success: () => 'Removed from favorite',
                            error: () => 'Something went wrong',
                        })
                        .unwrap()
                        .then(() => setIsFavorite(false))
                }
                className="cursor-pointer fill-rose-600"
            />
        )

    return (
        <HeartIcon
            onClick={() => {
                if (!user) return signIn()

                toast
                    .promise(favorite(listingId), {
                        loading: 'Adding to favorite...',
                        success: () => 'Added to favorite',
                        error: () => 'Something went wrong',
                    })
                    .unwrap()
                    .then(() => setIsFavorite(true))
            }}
            className="cursor-pointer"
        />
    )
}

export default FavoriteButton
