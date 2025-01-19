import { useMutation } from '@tanstack/react-query'
import {
    createListingAction,
    favoriteListingAction,
    unfavoriteListingAction,
} from '@/lib/actions/listingAction'
import { usePathname, useRouter } from 'next/navigation'

export const useCreateListing = () => {
    const router = useRouter()

    return useMutation({
        mutationFn: createListingAction,
        onSuccess: () => router.push('/my-listing'),
    })
}

export const useFavoriteListing = () =>
    useMutation({
        mutationFn: favoriteListingAction,
    })

export const useUnfavoriteListing = () => {
    const router = useRouter()
    const path = usePathname()

    return useMutation({
        mutationFn: unfavoriteListingAction,
        onSuccess: () => {
            if (path == '/favorite-listing') router.refresh()
        },
    })
}
