'use client'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MenuIcon } from 'lucide-react'
import Avatar from './Avatar'
import { User } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'
import { Button } from '../ui/button'
import Link from 'next/link'

const UserMenu = ({ user }: { user: User | undefined }) => {
    return (
        <div className="flex items-center gap-3">
            <Button
                asChild
                variant="ghost"
                className="hidden rounded-full text-sm font-bold md:block"
            >
                <Link href="/create-listing">Wolfbnb your home</Link>
            </Button>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className="flex items-center gap-1 rounded-full border-2">
                        <MenuIcon className="size-8 p-1" />

                        <div className="hidden md:block">
                            <Avatar user={user} />
                        </div>
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    {!user ? (
                        <DropdownMenuItem onClick={() => signIn()}>
                            Login
                        </DropdownMenuItem>
                    ) : (
                        <>
                            <DropdownMenuItem onClick={() => {}}>
                                My Trips
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={() => {}}>
                                My Favorites
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={() => {}}>
                                My Reservations
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={() => {}}>
                                My Properties
                            </DropdownMenuItem>

                            <DropdownMenuItem asChild className="md:hidden">
                                <Link href="/create-listing">
                                    Wolfbnb your home
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={() => signOut({ redirectTo: '/' })}
                            >
                                Logout
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default UserMenu
