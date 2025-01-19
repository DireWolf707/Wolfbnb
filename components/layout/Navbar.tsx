import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Search from './Search'
import UserMenu from './UserMenu'
import { getUser } from '@/lib/serverUtils'

const Navbar = async () => {
    const user = await getUser(false)

    return (
        <div className="flex items-center justify-between gap-2 border-b-2 p-2">
            <Link href="/" className="hidden md:block">
                <Image
                    alt="logo"
                    height={0}
                    width={180}
                    src="/images/logo.png"
                    className="h-full"
                />
            </Link>

            <Search />

            <UserMenu user={user} />
        </div>
    )
}

export default Navbar
