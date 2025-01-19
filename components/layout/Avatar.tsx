import React from 'react'
import Image from 'next/image'
import { User } from 'next-auth'
import { cn } from '@/lib/utils'

const Avatar = ({ user }: { user: User | undefined }) => {
    return (
        <Image
            alt="logo"
            className={cn('rounded-full', user && 'p-1')}
            height={30}
            width={30}
            src={user?.image ? user.image : '/images/placeholder.png'}
        />
    )
}

export default Avatar
