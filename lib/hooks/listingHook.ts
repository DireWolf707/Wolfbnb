import { useMutation } from '@tanstack/react-query'
import { createListingAction } from '@/lib/actions/listingAction'
import { useRouter } from 'next/navigation'

export const useCreateListing = () => {
    const router = useRouter()

    return useMutation({
        mutationFn: createListingAction,
        onSuccess: () => router.push('/my-listing'),
    })
}
