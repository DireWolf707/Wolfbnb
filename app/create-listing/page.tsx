'use client'
import React, { useState, useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
    categortyT,
    unsafeCreateListingT,
    createListingT,
    createListingFormStepT,
    MyFile,
    STEPS,
} from '@/lib/types'
import { listingSchema } from '@/lib/zodSchemas'
import CategoryInput from '@/components/listing/create/CategoryInput'
import NavigationButton from '@/components/listing/create/NavigationButton'
import LocationInput from '@/components/listing/create/LocationInput'
import CounterInput from '@/components/listing/create/CounterInput'
import ImageUpload from '@/components/listing/create/ImageUpload'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import FormError from '@/components/listing/create/FormError'
import { DollarSignIcon } from 'lucide-react'
import Heading from '@/components/layout/Heading'
import { toast } from 'sonner'
import { useCreateListing } from '@/lib/hooks/listingHook'

const defaultValues: unsafeCreateListingT = {
    guestCount: 1,
    roomCount: 1,
    bathroomCount: 1,
    price: 1,
}

const formFields: createListingFormStepT = {
    [STEPS.CATEGORY]: ['category'],
    [STEPS.LOCATION]: ['location'],
    [STEPS.INFO]: ['bathroomCount', 'guestCount', 'roomCount'],
    [STEPS.IMAGE]: ['image'],
    [STEPS.DESCRIPTION]: ['title', 'description'],
    [STEPS.PRICE]: ['price'],
}

const CreateListing = () => {
    const [step, setStep] = useState(STEPS.CATEGORY)
    const { mutateAsync: createListing, isPending } = useCreateListing()
    const {
        watch,
        register,
        handleSubmit,
        setValue,
        trigger,
        formState: { errors },
    } = useForm<createListingT>({
        resolver: zodResolver(listingSchema),
        defaultValues,
    })

    const image = watch('image') as MyFile

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
        () => (step == STEPS.CATEGORY ? undefined : 'Back'),
        [step]
    )

    return (
        <form className="mx-auto my-6 flex w-[480px] flex-col gap-8 overflow-y-auto rounded-xl border-2 p-4">
            {step == STEPS.CATEGORY && (
                <>
                    <Heading
                        title="Which of these best describes your place?"
                        subtitle="Pick a category"
                        err={errors.category}
                    />

                    <CategoryInput
                        value={watch('category')}
                        onClick={(val: categortyT) => setValue('category', val)}
                    />
                </>
            )}

            {step == STEPS.LOCATION && (
                <>
                    <Heading
                        title="Where is your place located?"
                        subtitle="Help guests find you!"
                        err={errors.location}
                    />

                    <LocationInput
                        value={watch('location')}
                        onClick={(val: string) => setValue('location', val)}
                    />
                </>
            )}

            {step == STEPS.INFO && (
                <>
                    <Heading
                        title="Share some basics about your place"
                        subtitle="What amenities do you have?"
                    />

                    <div className="flex flex-col gap-4 overflow-auto">
                        <CounterInput
                            title="Guests"
                            subtitle="How many guests do you allow?"
                            value={watch('guestCount')}
                            onChange={(val: number) =>
                                setValue('guestCount', val)
                            }
                        />
                        <hr />
                        <CounterInput
                            title="Rooms"
                            subtitle="How many rooms do you have?"
                            value={watch('roomCount')}
                            onChange={(val: number) =>
                                setValue('roomCount', val)
                            }
                        />
                        <hr />
                        <CounterInput
                            title="Bathrooms"
                            subtitle="How many bathrooms do you have?"
                            value={watch('bathroomCount')}
                            onChange={(val: number) =>
                                setValue('bathroomCount', val)
                            }
                        />
                    </div>
                </>
            )}

            {step == STEPS.IMAGE && (
                <>
                    <Heading
                        title="Add a photos of your place"
                        subtitle="Show guests what you place looks like!"
                        err={errors.image}
                    />

                    <div className="flex flex-col gap-4">
                        {image?.preview && (
                            <Image
                                className="mx-auto aspect-square rounded-xl object-cover"
                                src={image.preview!}
                                alt="image"
                                height={200}
                                width={200}
                            />
                        )}

                        <ImageUpload
                            file={image}
                            setFile={(file: MyFile) => setValue('image', file)}
                            disabled={false}
                        />
                    </div>
                </>
            )}

            {step == STEPS.DESCRIPTION && (
                <>
                    <Heading
                        title="How would you describe your place?"
                        subtitle="Short and sweet works best!"
                    />

                    <div className="flex flex-col gap-4">
                        <Label>Title</Label>
                        <Input {...register('title')} />
                        <FormError err={errors.title} />

                        <Label>Description</Label>
                        <Textarea {...register('description')} />
                        <FormError err={errors.description} />
                    </div>
                </>
            )}

            {step == STEPS.PRICE && (
                <>
                    <Heading
                        title="Set your price"
                        subtitle="How much do you charge per night?"
                    />

                    <div className="flex flex-col gap-4">
                        <Label>Price</Label>
                        <div className="flex items-center gap-2">
                            <DollarSignIcon className="size-5" />
                            <Input
                                type="number"
                                {...register('price', { valueAsNumber: true })}
                                min={1}
                            />
                        </div>
                        <FormError err={errors.price} />
                    </div>
                </>
            )}

            <NavigationButton
                onNext={onNext}
                onBack={onBack}
                actionLabel={actionLabel}
                secondaryActionLabel={secondaryActionLabel}
                disabled={isPending}
            />
        </form>
    )
}

export default CreateListing
