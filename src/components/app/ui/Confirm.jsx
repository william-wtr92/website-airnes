import classNames from "classnames"
import Button from "./Button"
import { useTranslation } from "next-i18next"

const Confirm = (props) => {
  const { className, display, action, params, textValue, useCase } = props

  const handleYes = () => {
    display(false)

    if (params) {
      action(...params)()
    } else {
      action()
    }
  }


  const handleFalse = () => {
    display(false)
  }

  const { t } = useTranslation("navbar")

  return (
    <div
      className={classNames(
        "md:w-1/2 w-full md:h-1/3 h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 shadow-md rounded-md absolute lg:w-full",
        className
      )}
    >
      <div className="h-full flex flex-col justify-center gap-10 p-4">
        <h1 className="text-xl font-semibold text-gray-700 text-center">
          {textValue}
        </h1>
        <div className="flex justify-around">
          <Button variant="reverse"
                  className={classNames("w-2/5", useCase === "cookie" && "hidden")}
                  onClick={handleFalse}>
            {t(`no`)}
          </Button>
          <Button className="w-2/5" onClick={handleYes}>
            {t(`yes`)}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Confirm
