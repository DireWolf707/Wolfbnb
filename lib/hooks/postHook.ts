import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createPostAction, getPostsAction } from '@/lib/actions/postAction'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export const useCreatePost = () => {
    const router = useRouter()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createPostAction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
            toast.success('Post created successfully')
            router.push('/')
        },
        onError: () => toast.error('Post not created'),
    })
}

export const useGetPosts = () => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: getPostsAction,
    })
}
