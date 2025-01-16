import React from 'react'

const FormHeading = ({
    title,
    subtitle,
}: {
    title: string
    subtitle: string
}) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="text-xl font-bold text-rose-500">{title}</div>
            <div className="text-sm font-semibold text-neutral-400">
                {subtitle}
            </div>
        </div>
    )
}

export default FormHeading
