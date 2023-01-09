import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const CarouselMain = () => {
  return (
    <Carousel className="Carousel mx-20 my-10" showThumbs={false} showArrows={false} showStatus={false} centerMode centerSlidePercentage={100} >
      <div>
        <img src="/images/meuble2.jpg" alt="meuble"/>
      </div>
      <div>
        <img src="/images/meuble2.jpg" alt="meuble"/>
      </div>
      <div>
        <img src="/images/meuble2.jpg" alt="meuble"/>
      </div>
    </Carousel>
  )
};

export default CarouselMain;



