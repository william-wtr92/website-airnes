import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"

const CarouselMain = () => {
  return (
    <Carousel
      className="mx-20 my-10 hover:cursor-pointer"
      showThumbs={false}
      showArrows={false}
      showStatus={false}
      autoPlay={true}
      autoPlaySpeed={5000}
      centerSlidePercentage={100}
    >
      <div>
        <img
          src="/images/meuble2.jpg"
          alt="meuble"
          className="object-cover h-[350px] w-full"
        />
      </div>
      <div>
        <img
          src="/images/meuble2.jpg"
          alt="meuble"
          className=" object-cover h-[350px] w-full"
        />
      </div>
      <div>
        <img
          src="/images/meuble2.jpg"
          alt="meuble"
          className="object-cover h-[350px] w-full"
        />
      </div>
    </Carousel>
  )
}

export default CarouselMain
