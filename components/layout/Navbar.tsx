import React from 'react'
import Link from 'next/link'
import SignInButton from '../auth/SignInButton'
import SignOutButton from '../auth/SignOutButton'
import { auth } from '@/auth'

const Navbar = async () => {
    const session = await auth()

    return (
        <div className="flex items-center justify-between rounded-b-lg border-4 p-4">
            <Link href="/">Navbar</Link>

            {!session ? <SignInButton /> : <SignOutButton />}
        </div>
    )
}

export default Navbar
