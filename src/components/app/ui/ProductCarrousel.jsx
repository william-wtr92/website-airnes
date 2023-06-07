import React, { useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"

const ProductCarousel = (props) => {
    const { images } = props
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const handleNextImage = () => {
        if (currentImageIndex < images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1)
        } else {
            setCurrentImageIndex(0)
        }
    }

    const handlePreviousImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1)
        } else {
            setCurrentImageIndex(images.length - 1)
        }
    }

    return (
        <div
            className="flex bg-cover w-full h-80"
            style={{
                backgroundImage: `url(${images[currentImageIndex].url})`,
            }}
        >
            <div className="flex justify-between w-full">
                <button className="h-full flex flex-col justify-center" onClick={handlePreviousImage}>
                    <ChevronLeftIcon className="w-6 text-white font-bold" />
                </button>
                <button className="h-full flex flex-col justify-center" onClick={handleNextImage}>
                    <ChevronRightIcon className="w-6 text-white font-bold" />
                </button>
            </div>
        </div>
    )
}

export default ProductCarousel
