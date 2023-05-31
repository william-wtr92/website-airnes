import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import classNames from "classnames"

const ProductCarousel = (props) => {
  const { imageState } = props

  return (
      <div
          className={classNames("flex bg-cover w-full h-80")}
          style={{
            backgroundImage: `url(${imageState})`,
          }}
      >
        <div className="flex justify-between w-full">
          <bouton className="h-full flex flex-col justify-center">
            <ChevronLeftIcon className="w-6 text-white font-bold" />
          </bouton>
          <bouton className="h-full flex flex-col justify-center">
            <ChevronRightIcon className="w-6 text-white font-bold" />
          </bouton>
        </div>
      </div>
  )
}

export default ProductCarousel