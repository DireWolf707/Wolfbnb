import React from 'react'
import { Button } from '../../ui/button'

const NavigationButton = ({
    onNext,
    onBack,
    disabled = false,
    actionLabel,
    secondaryActionLabel,
}: {
    onNext: () => void
    onBack: () => void
    disabled?: boolean
    actionLabel: string
    secondaryActionLabel?: string
}) => {
    return (
        <div className="flex gap-2">
            {secondaryActionLabel && (
                <Button
                    type="button"
                    onClick={onBack}
                    className="w-full"
                    disabled={disabled}
                >
                    {secondaryActionLabel}
                </Button>
            )}

            <Button
                type="button"
                variant="destructive"
                onClick={onNext}
                className="w-full"
                disabled={disabled}
            >
                {actionLabel}
            </Button>
        </div>
    )
}

export default NavigationButton
