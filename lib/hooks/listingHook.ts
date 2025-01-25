import { useMutation } from '@tanstack/react-query'
import {
    createListingAction,
    createReservationAction,
    deleteListingAction,
    deleteReservationAction,
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

export const useDeleteListing = () => {
    const router = useRouter()

    return useMutation({
        mutationFn: deleteListingAction,
        onSuccess: () => router.refresh(),
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
            if (path == '/favorite-listings') router.refresh()
        },
    })
}

export const useCreateReservation = () => {
    const router = useRouter()

    return useMutation({
        mutationFn: createReservationAction,
        onSuccess: () => router.push('/my-trips'),
    })
}

export const useDeleteReservation = () => {
    const router = useRouter()

    return useMutation({
        mutationFn: deleteReservationAction,
        onSuccess: () => router.refresh(),
    })
}
