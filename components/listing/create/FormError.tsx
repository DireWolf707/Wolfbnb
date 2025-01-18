import React from 'react'
import { FieldError } from 'react-hook-form'

const FormError = ({ err }: { err?: FieldError }) => {
    if (!err) return <></>

    return (
        <p className="text-right text-sm font-extrabold text-rose-400">
            *{err.message}
        </p>
    )
}

export default FormError
