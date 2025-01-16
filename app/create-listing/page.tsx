'use client'
import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { listingT, STEPS, unsafeListingT } from '@/lib/types'
import { listingSchema } from '@/lib/zodSchemas'
import CategoryInput from '@/components/listing/CategoryInput'
import FormNavigationButton from '@/components/listing/FormNavigationButton'
import FormHeading from '@/components/listing/FormHeading'
import FormWrapper from '@/components/listing/FormWrapper'
import LocationInput from '@/components/listing/LocationInput'
import CounterInput from '@/components/listing/CounterInput'

const defaultValues: unsafeListingT = {
    guestCount: 1,
    roomCount: 1,
    bathroomCount: 1,
    price: 1,
}

const CreateListing = () => {
    const [step, setStep] = useState(STEPS.CATEGORY)
    const form = useForm<listingT>({
        resolver: zodResolver(listingSchema),
        defaultValues,
    })

    if (step == STEPS.CATEGORY)
        return (
            <FormWrapper>
                <FormHeading
                    title="Which of these best describes your place?"
                    subtitle="Pick a category"
                />
                <CategoryInput
                    value={form.watch('category')}
                    onClick={(val: string) => form.setValue('category', val)}
                />
                <FormNavigationButton step={step} setStep={setStep} />
            </FormWrapper>
        )

    if (step == STEPS.LOCATION)
        return (
            <FormWrapper>
                <FormHeading
                    title="Where is your place located?"
                    subtitle="Help guests find you!"
                />
                <LocationInput
                    value={form.watch('location')}
                    onClick={(val: string) => form.setValue('location', val)}
                />
                <FormNavigationButton step={step} setStep={setStep} />
            </FormWrapper>
        )

    if (step == STEPS.INFO)
        return (
            <FormWrapper>
                <FormHeading
                    title="Share some basics about your place"
                    subtitle="What amenities do you have?"
                />
                <div className="flex flex-col gap-4 overflow-auto">
                    <CounterInput
                        title="Guests"
                        subtitle="How many guests do you allow?"
                        value={form.watch('guestCount')}
                        onChange={(val: number) =>
                            form.setValue('guestCount', val)
                        }
                    />
                    <hr />
                    <CounterInput
                        title="Rooms"
                        subtitle="How many rooms do you have?"
                        value={form.watch('roomCount')}
                        onChange={(val: number) =>
                            form.setValue('roomCount', val)
                        }
                    />
                    <hr />
                    <CounterInput
                        title="Bathrooms"
                        subtitle="How many bathrooms do you have?"
                        value={form.watch('bathroomCount')}
                        onChange={(val: number) =>
                            form.setValue('bathroomCount', val)
                        }
                    />
                </div>
                <FormNavigationButton step={step} setStep={setStep} />
            </FormWrapper>
        )

    if (step == STEPS.IMAGES)
        return (
            <FormWrapper>
                <FormHeading
                    title="Add a photos of your place"
                    subtitle="Show guests what you place looks like!"
                />
                {/* <LocationInput
                    value={form.watch('location')}
                    onClick={(val: string) => form.setValue('location', val)}
                /> */}
                <FormNavigationButton step={step} setStep={setStep} />
            </FormWrapper>
        )
}

export default CreateListing
