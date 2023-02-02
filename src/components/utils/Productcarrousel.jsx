import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import classNames from "classnames"
import { useCallback, useState } from "react"

const ProductCarousel = (props) => {
  const { imageState, className } = props
  const [idImage, setIdImage] = useState(0)

  const maxId = imageState.length
  const handleDown = useCallback(() => {
    setIdImage((idImage) => (idImage === 0 ? maxId - 1 : idImage - 1))
  }, [maxId])
  const handleUp = useCallback(() => {
    setIdImage((idImage) => (idImage === maxId - 1 ? 0 : idImage + 1))
  }, [maxId])

  return (
    /*<div
      className={classNames(
        " flex bg-cover",
        imageState.find(({ id }) => id === idImage).sens === "h"
          ? " w-full h-64"
          : " w-2/3 h-96",
        className
      )}
      style={{
        backgroundImage: `url(${
          imageState.find(({ id }) => id === idImage).src
        })`,
      }}
    >*/
      <div
          className={classNames(
              " flex bg-cover",
              imageState.find(({id}) => id === idImage).sens === "h"
                  ? " w-full h-64"
                  : " w-2/3 h-96",
              className
          )}
          style={{
            backgroundImage: `url(${
                imageState.find(({id}) => id === idImage).src
            })`,
          }}
      >
      <div className="flex justify-between w-full">
        <bouton
          className="h-full  flex flex-col justify-center"
          onClick={handleDown}
        >
          <ChevronLeftIcon className="w-6 " />
        </bouton>
        <bouton
          className="h-full  flex flex-col justify-center"
          onClick={handleUp}
        >
          <ChevronRightIcon className="w-6" />
        </bouton>
      </div>
    </div>
  )
}

export default ProductCarousel
