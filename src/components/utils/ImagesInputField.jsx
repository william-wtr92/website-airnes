import React, { useState } from "react"
import { useFormikContext } from "formik"
import FormField from "@/components/utils/FormField"
import { TrashIcon } from "@heroicons/react/24/solid"

export const ImagesInput = () => {
    const { setFieldValue, values } = useFormikContext()
    const [image, setImage] = useState(
        Array.isArray(values.image) && values.image.length > 0
            ? values.image
            : [{ url: "" }]
    )

    const addImage = async () => {
        setImage([...image, { url: "" }])
    }

    const removeImage = (i) => () => {
        setImage((prevImage) => {
            const newImages = prevImage.filter((_, index) => index !== i)
            setFieldValue("image", newImages)

        return newImages
        })
    }

    const clearImages = () => {
        setImage([])
    }

    return (
        <>
            {image.map((_, index) => {
                const fieldName = `image[${index}]`

            return (
                    <fieldset name={fieldName} key={fieldName} className='flex'>
                        <FormField
                            type='text'
                            name={`${fieldName}.url`}
                            placeholder='Enter the image link'
                            label={`Image ${index + 1}`}
                            className='w-96'
                        />
                        <TrashIcon className='h-6 w-6 mt-10' onClick={removeImage(index)} />
                    </fieldset>
                )
            })}
            <button type='button' onClick={addImage}>
                Add Image
            </button>
            <button type='button' onClick={clearImages}>
                Clear Images
            </button>
        </>
    )
}