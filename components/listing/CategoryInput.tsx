import { categories } from '@/lib/constants'
import { cn } from '@/lib/utils'
import React from 'react'

const CategoryInput = ({
    value,
    onClick,
}: {
    value: string
    onClick: (val: string) => void
}) => {
    return (
        <div className="grid grid-cols-1 gap-3 overflow-y-auto pr-1 md:grid-cols-2">
            {categories.map(({ label, Icon }) => {
                const isSelected = value == label

                return (
                    <div
                        key={label}
                        className={cn(
                            'flex flex-col items-center gap-2 rounded-xl border-2 p-4 border-neutral-700 cursor-pointer',
                            isSelected && 'border-rose-500 text-rose-500',
                            !isSelected && 'hover:border-rose-500'
                        )}
                        onClick={() => onClick(label)}
                    >
                        <Icon className="size-14" />
                        <div className="font-semibold">{label}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default CategoryInput
