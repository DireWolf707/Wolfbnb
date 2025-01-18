import React, { useMemo } from 'react'
import { Button } from '../../ui/button'
import { createListingFormStepT, createListingT, STEPS } from '@/lib/types'
import { UseFormHandleSubmit, UseFormTrigger } from 'react-hook-form'
import { toast } from 'sonner'
import { useCreateListing } from '@/lib/hooks/listingHook'

const FormNavigationButton = ({
    step,
    setStep,
    formFields,
    handleSubmit,
    trigger,
}: {
    handleSubmit: UseFormHandleSubmit<createListingT>
    trigger: UseFormTrigger<createListingT>
    formFields: createListingFormStepT
    step: STEPS
    setStep: React.Dispatch<React.SetStateAction<STEPS>>
}) => {
    const { mutateAsync: createListing, isPending } = useCreateListing()

    const onBack = () =>
        setStep((prev) => {
            if (prev == 0) return 0
            return prev - 1
        })

    const onNext = async () => {
        const fields = formFields[step]
        const output = await trigger(fields)

        if (!output) return

        if (step == STEPS.PRICE)
            await handleSubmit(
                (data) =>
                    toast.promise(createListing(data), {
                        loading: 'Listing your property...',
                        success: () => 'Listing created successfully',
                        error: () => 'Something went wrong',
                    }),
                (e) =>
                    Object.entries(e).forEach(([key, err]) =>
                        toast.error(key + ': ' + err.message)
                    )
            )()
        else setStep((prev) => prev + 1)
    }

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
                <Button
                    type="button"
                    onClick={onBack}
                    className="w-full"
                    disabled={isPending}
                >
                    {secondaryActionLabel}
                </Button>
            )}

            <Button
                type="button"
                variant="destructive"
                onClick={onNext}
                className="w-full"
                disabled={isPending}
            >
                {actionLabel}
            </Button>
        </div>
    )
}

export default FormNavigationButton
