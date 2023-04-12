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
    return (
      <div className="flex flex-col gap-6 justify-center items-center h-72 lg:h-96">
        <div className="animate-spin w-8 h-8 border-t-2 border-transparent border-primary rounded-full"></div>
        <p className="font-bold">Loading ...</p>
      </div>
    )
  }

  if (slides.length === 0) {
    return (
      <div className="flex flex-col gap-6 justify-center items-center h-72 lg:h-96">
        <div className="animate-spin w-8 h-8 border-t-2 border-transparent border-primary rounded-full"></div>
        <p className="font-bold">No images available !</p>
      </div>
    )
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
      <div className="absolute bottom-4 w-full flex justify-center">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`w-3 h-3 bg-white opacity-60 mx-2 rounded-full cursor-pointer ${
              currentIndex === slideIndex ? "bg-white opacity-100" : ""
            }`}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default Carousel
