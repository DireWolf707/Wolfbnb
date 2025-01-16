import React, { useMemo } from 'react'
import { Button } from '../ui/button'
import { STEPS } from '@/lib/types'

const FormNavigationButton = ({
    step,
    setStep,
}: {
    step: STEPS
    setStep: React.Dispatch<React.SetStateAction<STEPS>>
}) => {
    const onBack = () =>
        setStep((prev) => {
            if (prev == 0) return 0
            return prev - 1
        })

    const onNext = () =>
        setStep((prev) => {
            if (prev == STEPS.PRICE)
                if (prev == STEPS.PRICE) {
                    // submit form
                }
            return prev + 1
        })

    const actionLabel = useMemo(
        () => (step == STEPS.PRICE ? 'Create' : 'Next'),
        [step]
    )

    const secondaryActionLabel = useMemo(
        () => (step == STEPS.CATEGORY ? null : 'Back'),
        [step]
    )

    return (
        <div className="flex gap-2">
            {secondaryActionLabel && (
                <Button onClick={onBack} className="w-full">
                    {secondaryActionLabel}
                </Button>
            )}

            <Button variant="destructive" onClick={onNext} className="w-full">
                {actionLabel}
            </Button>
        </div>
    )
}

export default FormNavigationButton
