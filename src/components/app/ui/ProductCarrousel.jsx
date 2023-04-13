import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import classNames from "classnames"

const ProductCarousel = (props) => {
  const { imageState } = propsnue

  return (
    <div
      className={classNames(
        " flex bg-cover w-2/3 h-96",
      )}
      style={{
        backgroundImage: `url(${
          imageState
        })`,
      }}
    >
      <div className="flex justify-between w-full">
        <bouton
          className="h-full  flex flex-col justify-center"
        >
          <ChevronLeftIcon className="w-6 " />
        </bouton>
        <bouton
          className="h-full  flex flex-col justify-center"
        >
          <ChevronRightIcon className="w-6" />
        </bouton>
      </div>
    </div>
  )
}

export default ProductCarousel
