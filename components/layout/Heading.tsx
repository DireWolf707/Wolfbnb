import React from 'react'
import { FieldError } from 'react-hook-form'
import FormError from '../listing/create/FormError'
import { cn } from '@/lib/utils'

const Heading = ({
    title,
    subtitle,
    err,
    center = false,
}: {
    title: string
    subtitle?: string
    err?: FieldError
    center?: boolean
}) => {
    return (
        <div>
            <div
                className={cn('flex flex-col gap-2', center && 'items-center')}
            >
                <div className="text-xl font-bold text-rose-500">{title}</div>
                <div className="text-sm font-semibold text-neutral-400">
                    {subtitle}
                </div>
            </div>

            {err && <FormError err={err} />}
        </div>
    )
}

export default Heading
