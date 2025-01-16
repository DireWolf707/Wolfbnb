import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Search from './Search'
import UserMenu from './UserMenu'
import { User } from 'next-auth'

const Navbar = ({ user }: { user: User | undefined }) => {
    return (
        <div className="flex items-center justify-between gap-2 border-b-2 p-2">
            <Link href="/">
                <Image
                    alt="logo"
                    className="hidden md:block"
                    height={0}
                    width={200}
                    src="/images/logo.png"
                />
            </Link>

            <Search />

            <UserMenu user={user} />
        </div>
    )
}

export default Navbar
