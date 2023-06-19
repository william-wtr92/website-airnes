import React from "react"
import { useFormikContext, FieldArray } from "formik"
import FormField from "@/components/utils/FormField"
import { TrashIcon } from "@heroicons/react/24/solid"

export const ImagesInput = () => {
    const { values, setFieldValue } = useFormikContext()

    const addImage = () => {
        setFieldValue("image", [...values.image, { url: "" }])
    }

    const removeImage = (index) => {
        const newImages = values.image.filter((_, i) => i !== index)
        setFieldValue("image", newImages)
    }

    const clearImages = () => {
        setFieldValue("image", [])
    }

    return (
        <FieldArray
            name="image"
            render={() => (
                <>
                    {values.image && values.image.length > 0 ? (
                        values.image.map((image, index) => {
                            return (
                                <fieldset name={`image.${index}`} key={index} className='flex'>
                                    <FormField
                                        type='text'
                                        name={`image.${index}.url`}
                                        placeholder='Enter the image link'
                                        label={`Image ${index + 1}`}
                                        className='w-96'
                                    />
                                    <TrashIcon className='h-6 w-6 mt-10' onClick={() => removeImage(index)} />
                                </fieldset>
                            )
                        })
                    ) : null}
                    <button type='button' onClick={addImage}>
                        Add Image
                    </button>
                    <button type='button' onClick={clearImages}>
                        Clear Images
                    </button>
                </>
            )}
        />
    )
}
