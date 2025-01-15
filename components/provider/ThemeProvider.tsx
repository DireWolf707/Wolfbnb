'use client'

import * as React from 'react'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export default function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return (
        <NextThemesProvider {...props}>
            {children}
            <Toaster position="top-right" />
        </NextThemesProvider>
    )
}
