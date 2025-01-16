import React, { useCallback } from 'react'
import FormHeading from './FormHeading'
import { Button } from '../ui/button'
import { MinusIcon, PlusIcon } from 'lucide-react'

const CounterInput = ({
    value,
    onChange,
    title,
    subtitle,
}: {
    value: number
    onChange: (val: number) => void
    title: string
    subtitle: string
}) => {
    const onAdd = useCallback(() => {
        onChange(value + 1)
    }, [onChange, value])

    const onReduce = useCallback(() => {
        if (value == 1) return

        onChange(value - 1)
    }, [onChange, value])

    return (
        <div className="flex justify-between">
            <FormHeading title={title} subtitle={subtitle} />

            <div className="flex items-center gap-2">
                <Button
                    onClick={onReduce}
                    variant="destructive"
                    size="icon"
                    className="rounded-full"
                >
                    <MinusIcon />
                </Button>

                {value}

                <Button
                    onClick={onAdd}
                    variant="destructive"
                    size="icon"
                    className="rounded-full"
                >
                    <PlusIcon />
                </Button>
            </div>
        </div>
    )
}

export default CounterInput
