import { useState, useEffect } from "react"
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs"
import axios from "axios"
import routes from "@/web/routes"

const Carousel = () => {
  const [slides, setSlides] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchImages = async () => {
      const { data } = await axios.get(
        `http://localhost:3000/api${routes.api.admin.carousel.getImages()}`
      )

      const sortedSlides = data.result.sort((a, b) => a.order - b.order)
      setIsLoading(false)
      setSlides(sortedSlides)
    }

    fetchImages()
  }, [])

  const prevSlide = () =>
    setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1)

  const nextSlide = () =>
    setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1)

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1)
    }, 5000)

    return () => clearInterval(intervalId)
  }, [currentIndex, slides.length])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (slides.length === 0) {
    return <div>No images available</div>
  }

  return (
    <div className="w-full h-72 m-auto mb-10 relative group lg:h-96">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-72 bg-center bg-cover duration-500 lg:h-96"
      ></div>

      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>

      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="flex top-4 justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          ></div>
        ))}
      </div>
    </div>
  )
}

export default Carousel
