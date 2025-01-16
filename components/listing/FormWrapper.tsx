import React from 'react'

const FormWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="mx-auto my-6 flex w-[480px] flex-col gap-8 overflow-y-auto rounded-xl border-2 p-4">
            {children}
        </div>
    )
}

export default FormWrapper
