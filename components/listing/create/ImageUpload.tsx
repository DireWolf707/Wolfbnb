import { MyFile } from '@/lib/types'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const ImageUpload = ({
    file,
    setFile,
    disabled = false,
}: {
    file: MyFile
    setFile: (file: MyFile) => void
    disabled: boolean
}) => {
    const onDrop = useCallback(
        (files: File[]) => {
            const newFile = files[0] as MyFile
            if (!newFile) return

            if (file?.preview) URL.revokeObjectURL(file.preview)

            newFile.preview = URL.createObjectURL(newFile)
            setFile(newFile)
        },
        [file, setFile]
    )

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxFiles: 1,
        accept: { 'image/*': [] },
    })

    return (
        <div
            {...getRootProps()}
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-black bg-black/10 p-2 text-center text-sm dark:border-white dark:bg-white/10"
        >
            <input {...getInputProps()} disabled={disabled} />
            <span>Drag & drop some file here, or</span>
            <span>click to select file</span>
        </div>
    )
}

export default ImageUpload
