'use client'
import { categories } from '@/lib/constants'
import { cn } from '@/lib/utils'
import React, { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

const Categories = () => {
    const router = useRouter()
    const params = useSearchParams()

    const onClickHandler = useCallback(
        (label: string) => {
            const oldParams = qs.parse(params.toString())
            const newParams: { category: string | null } = {
                ...oldParams,
                category: label,
            }

            if (params.get('category') == label) newParams.category = null

            const url = qs.stringifyUrl(
                {
                    url: '/',
                    query: newParams,
                },
                { skipNull: true }
            )

            router.push(url)
        },
        [params, router]
    )

    return (
        <div className="flex items-center justify-center gap-2 overflow-x-auto p-2">
            {categories.map(({ label, description, Icon }) => {
                const isSelected = params.get('category') == label

                return (
                    <TooltipProvider key={label}>
                        <Tooltip>
                            <TooltipTrigger>
                                <div
                                    onClick={() => onClickHandler(label)}
                                    className={cn(
                                        'flex cursor-pointer flex-col items-center gap-2 p-2 text-neutral-500 hover:text-rose-400 border-b-2 border-transparent',
                                        isSelected &&
                                            'text-rose-700 border-rose-700'
                                    )}
                                >
                                    <Icon className="size-6" />
                                    <div className="text-sm font-medium">
                                        {label}
                                    </div>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>{description}</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )
            })}
        </div>
    )
}

export default Categories
