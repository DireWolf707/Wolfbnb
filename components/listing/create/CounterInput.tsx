import React, { useCallback } from 'react'
import { Button } from '../../ui/button'
import { MinusIcon, PlusIcon } from 'lucide-react'
import Heading from '@/components/layout/Heading'

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
            <Heading title={title} subtitle={subtitle} />

            <div className="flex items-center gap-2">
                <Button
                    type="button"
                    onClick={onReduce}
                    variant="destructive"
                    size="icon"
                    className="rounded-full"
                >
                    <MinusIcon />
                </Button>

                {value}

                <Button
                    type="button"
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
