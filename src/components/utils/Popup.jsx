import classNames from "classnames"
import { XMarkIcon } from "@heroicons/react/24/solid"

const Popup = (props) => {
  const { className, display, children } = props

  const handleFalse = () => {
    display(false)
  }

  return (
    <div
      className={classNames(
        "md:my-16 w-full lg:w-4/5 h-fit top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 shadow-md rounded-md absolute inline-block",
        className
      )}
    >
      <XMarkIcon
        className=" h-6 hover:cursor-pointer fixed top-5 right-5"
        onClick={handleFalse}
      />
      {children}
    </div>
  )
}

export default Popup
